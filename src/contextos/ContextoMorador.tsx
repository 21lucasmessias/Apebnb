import React, { useContext } from 'react'

import firebase from 'firebase'
import { auth, db } from '../configs/firebase'

import { ContextoAutenticacao } from './ContextoAutenticacao';

import { iMorador } from '../models/Morador';
import { showToast } from '../utils/Animacoes';

interface iContextoMorador {
  getDadosMorador: () => Promise<iMorador | undefined>,
  setDadosMorador: (morador: iMorador, password: string | null) => Promise<boolean>,
  adicionarListenerNomeMorador: (refreshUserNome: (nome: string) => void) => () => void,
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
  const { user } = useContext(ContextoAutenticacao)

  const adicionarListenerNomeMorador = (refreshUserNome: (nome: string) => void) => {
    var unsubscribe = db.collection('moradores')
    .withConverter(converterMoradorFirebase)
    .doc(`${user.uid}`)
    .onSnapshot((doc) => {
      refreshUserNome(doc.data()!.nome)
    })

    return unsubscribe
  }

  const getDadosMorador = () => {
    let dados: iMorador | undefined

    return db.collection('moradores')
    .withConverter(converterMoradorFirebase)
    .doc(`${user.uid}`)
    .get()
    .then(doc => {
      if (doc.exists) {
        dados = doc.data()
      }
      return dados
    })
    .catch((err) => {
      console.log(err)
      showToast('Algo deu errado. Contate o desenvolvedor.')
      return dados
    })
  }

  const setDadosMorador = (morador: iMorador, senha: string | null) => {  
    return new Promise<boolean>((res, rej) => {
      if(senha){
        auth.currentUser!.updatePassword(senha)
        .catch((err) => {
          showToast('Algo deu errado. Contate o desenvolvedor.')
          console.log(`Error in updatePassword`, err)
          rej(false)
        })
      }
  
      db.collection('moradores')
      .withConverter(converterMoradorFirebase)
      .doc(morador.id)
      .set(morador)
      .catch((err) => {
        showToast('Algo deu errado. Contate o desenvolvedor.')
        console.log(`Error in updateMorador`, err)
        rej(false)
      })

      res(true)
    })  
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
      getDadosMorador,
      setDadosMorador,
      adicionarListenerNomeMorador,
      removerMorador
    }}>
      {children}
    </ContextoMorador.Provider >
  )
}

export default ContextoMoradorProvider