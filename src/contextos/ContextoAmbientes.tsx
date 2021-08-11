import React from 'react'

import firebase from 'firebase'
import { db } from '../configs/firebase'

import { iAmbiente } from '../models/Ambiente'
import { showToast } from '../utils/Animacoes'

interface iContextoAmbientes {
  criarAmbiente: (ambiente: iAmbiente) => Promise<void>,
  removerAmbiente: (ambiente: iAmbiente) => Promise<void>,
  atualizarAmbiente: (ambiente: iAmbiente) => Promise<void>,
  getAllAmbientes: () => Promise<iAmbiente[]>,
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

  const getAllAmbientes = () => {
    return db.collection('ambientes')
    .withConverter(converterAmbienteFirebase)
    .get()
    .then((res) => {
      return res.docs.map((doc) => doc.data())
    })
    .catch((err) => {
      console.log(err)
      return [] as iAmbiente[]
    })
  }

  const criarAmbiente = (ambiente: iAmbiente) => {
    return db.collection('ambientes')
    .withConverter(converterAmbienteFirebase)
    .add(ambiente)
    .then((res) => {
      res.update({
        id: res.id
      })
      .then(() => {
        showToast('Ambiente criado com sucesso.')
      })
      .catch((err) => {
        console.log(err)
        showToast('Um erro ocorreu. Contate o desenvolvedor.')
      })
    })
    .catch((err) => {
      console.log(err)
      showToast('Um erro ocorreu. Contate o desenvolvedor.')
    })
  }

  const atualizarAmbiente = (ambiente: iAmbiente) => {
    return db.collection('ambientes')
    .withConverter(converterAmbienteFirebase)
    .doc(ambiente.id)
    .update(ambiente)
    .then((res) => {
      showToast('Ambiente atualizado com sucesso.')
    })
    .catch((err) => {
      console.log(err)
      showToast('Um erro ocorreu. Contate o desenvolvedor.')
    })
  }

  const removerAmbiente = (ambiente: iAmbiente) => {
    return db.collection('ambientes')
    .withConverter(converterAmbienteFirebase)
    .doc(ambiente.id)
    .delete()
    .then(() => {
      showToast('Ambiente removido com sucesso.')
    })
    .catch((err) => {
      showToast('Erro ao remover ambiente.')
    })
  }

  return (
    <ContextoAmbientes.Provider value={{
      criarAmbiente,
      removerAmbiente,
      atualizarAmbiente,
      getAllAmbientes,
      adicionarAutoRefreshAmbientes,
    }}>
      {children}
    </ContextoAmbientes.Provider >
  )
}

export default ContextoAmbientesProvider