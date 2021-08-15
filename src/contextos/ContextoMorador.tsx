import React from 'react'

import firebase from 'firebase'
import { auth, db } from '../configs/firebase'

import { iMorador } from '../models/Morador';
import { showToast } from '../utils/Animacoes';

interface iContextoMorador {
  getMorador: (id: string) => Promise<iMorador | undefined>,
  alterarMorador: (morador: iMorador, senha: string | null) => Promise<void>
  adicionarListenerNomeMorador: (id: string, refreshUserNome: (nome: string) => void) => () => void,
  removerMorador: (morador: iMorador) => Promise<void>
}

type iContextoMoradorProvider = {
  children: React.ReactNode
}

export const ContextoMorador = React.createContext({} as iContextoMorador)

export const converterMoradorFirebase = {
  toFirestore: (data: iMorador) => data,
  fromFirestore: (snap: firebase.firestore.QueryDocumentSnapshot) => snap.data() as iMorador
}

const ContextoMoradorProvider: React.FC<iContextoMoradorProvider> = ({ children }) => {

  const adicionarListenerNomeMorador = (id: string, refreshUserNome: (nome: string) => void) => {
    var unsubscribe = db.collection('moradores')
      .withConverter(converterMoradorFirebase)
      .doc(id)
      .onSnapshot((doc) => {
        refreshUserNome(doc.data()!.nome)
      })

    return unsubscribe
  }

  const getMorador = async (id: string) => {
    let dados: iMorador | undefined

    try {
      const doc = await db.collection('moradores')
        .withConverter(converterMoradorFirebase)
        .doc(id)
        .get()
      
      if (doc.exists) {
        dados = doc.data()
      }

      return dados
    } catch(err) {
      console.log(err)
      showToast('Algo deu errado. Contate o desenvolvedor.')

      return dados
    }
  }

  const alterarMorador = async (morador: iMorador, senha: string | null) => {  
    try {
      if(senha){
        await auth.currentUser!.updatePassword(senha)
      }

      await db.collection('moradores')
        .withConverter(converterMoradorFirebase)
        .doc(morador.id)
        .update(morador)

      showToast('Dados alterados com sucesso')
    } catch(err) {
      showToast('Algo deu errado. Contate o desenvolvedor.')
      console.log(`Error in alterarMorador`, err)
    }
  }

  const removerMorador = async (morador: iMorador) => {
    const batch = db.batch()
    const moradorRef = db.collection('moradores').doc(morador.id)
    const userRef = db.collection('users').doc(morador.id)

    try {
      batch.delete(moradorRef)
      batch.delete(userRef)
      
      await batch.commit()
      
      showToast('Morador removido com sucesso.')
    } catch(err) {
      console.log(err)
      showToast('Erro ao remover morador.')
    }
  }

  return (
    <ContextoMorador.Provider value={{
      getMorador,
      alterarMorador,
      adicionarListenerNomeMorador,
      removerMorador
    }}>
      {children}
    </ContextoMorador.Provider >
  )
}

export default ContextoMoradorProvider