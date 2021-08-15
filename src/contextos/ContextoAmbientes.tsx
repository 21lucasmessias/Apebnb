import React from 'react'

import firebase from 'firebase'
import { db } from '../configs/firebase'

import { iAmbiente } from '../models/Ambiente'
import { showToast } from '../utils/Animacoes'

interface iContextoAmbientes {
  criarAmbiente: (ambiente: iAmbiente) => Promise<boolean>,
  removerAmbiente: (ambiente: iAmbiente) => Promise<void>,
  atualizarAmbiente: (ambiente: iAmbiente) => Promise<void>,
  getAllAmbientes: () => Promise<iAmbiente[]>,
  getAmbiente: (id: string) => Promise<iAmbiente | null>
  adicionarAutoRefreshAmbientes: (atualizarAmbientes: () => void) => () => void
}

export const ContextoAmbientes = React.createContext({} as iContextoAmbientes)

type iContextoAmbientesProvider = {
  children: React.ReactNode;
}

export const converterAmbienteFirebase = {
  toFirestore: (data: iAmbiente) => data,
  fromFirestore: (snap: firebase.firestore.QueryDocumentSnapshot) => snap.data() as iAmbiente
}

const ContextoAmbientesProvider: React.FC<iContextoAmbientesProvider> = ({ children }) => {

  const adicionarAutoRefreshAmbientes = (atualizarAmbientes: () => void) => {
    return db.collection('ambientes')
      .withConverter(converterAmbienteFirebase)
      .onSnapshot(() => {
        atualizarAmbientes()
      })
  }

  const getAllAmbientes = async () => {
    try {
      const res = await db.collection('ambientes')
        .withConverter(converterAmbienteFirebase)
        .get()
  
      const ambientes = res.docs.map((doc) => doc.data())

      return ambientes
    } catch(err) {
      console.log(err)
      return [] as iAmbiente[]
    }
  }

  const getAmbiente = async (id: string) => {
    try {
      const res = await db.collection('ambientes')
        .withConverter(converterAmbienteFirebase)
        .doc(id)
        .get()

      if(!res.exists) return null
  
      return res.data() as iAmbiente
    } catch(err) {
      console.log(err)
      return null
    }
  }

  const criarAmbiente = async (ambiente: iAmbiente) => {
    try {
      const res = await db.collection('ambientes')
        .withConverter(converterAmbienteFirebase)
        .add(ambiente)
  
      await res.update({ id: res.id })
  
      showToast('Ambiente criado com sucesso.')

      return true;
    } catch(err) {
      console.log(err)
      showToast('Um erro ocorreu. Contate o desenvolvedor.')
    }

    return false;
  }

  const atualizarAmbiente = async (ambiente: iAmbiente) => {
    try {
      await db.collection('ambientes')
        .withConverter(converterAmbienteFirebase)
        .doc(ambiente.id)
        .update(ambiente)
  
      showToast('Ambiente atualizado com sucesso.')
    } catch(err) {
      console.log(err)
      showToast('Um erro ocorreu. Contate o desenvolvedor.')
    }
  }

  const removerAmbiente = async (ambiente: iAmbiente) => {
    try {
      await db.collection('ambientes')
        .withConverter(converterAmbienteFirebase)
        .doc(ambiente.id)
        .delete()
      
      showToast('Ambiente removido com sucesso.')
    } catch(err) {
      console.log(err)
      showToast('Erro ao remover ambiente.')
    }
  }

  return (
    <ContextoAmbientes.Provider value={{
      criarAmbiente,
      removerAmbiente,
      atualizarAmbiente,
      getAllAmbientes,
      getAmbiente,
      adicionarAutoRefreshAmbientes,
    }}>
      {children}
    </ContextoAmbientes.Provider >
  )
}

export default ContextoAmbientesProvider