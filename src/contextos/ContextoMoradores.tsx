import React from 'react'

import { db } from '../configs/firebase'

import { iMorador } from '../models/Morador'

import { showToast } from '../utils/Animacoes'
import { converterMoradorFirebase } from './ContextoMorador'

interface iContextoMoradores {
  getAllMoradoresAprovados: () => Promise<iMorador[]>,
  getAllMoradoresDesaprovados: () => Promise<iMorador[]>,
  setAprovado: (morador: iMorador) => void,
  adicionarAutoRefreshMoradoresReprovados: (fetchMoradoresReprovados: () => void) => () => void
  adicionarAutoRefreshMoradoresAprovados: (fetchMoradoresAprovados: () => void) => () => void
}

export const ContextoMoradores = React.createContext({} as iContextoMoradores)

type iContextoMoradoresProvider = {
  children: React.ReactNode;
}

const ContextoMoradoresProvider: React.FC<iContextoMoradoresProvider> = ({ children }) => {
  const adicionarAutoRefreshMoradoresReprovados = (fetchMoradoresReprovados: () => void) => {
    return db.collection('moradores')
    .withConverter(converterMoradorFirebase)
    .where('aprovado', '==', false)
    .onSnapshot(() => {
      fetchMoradoresReprovados()
    })
  }

  const adicionarAutoRefreshMoradoresAprovados = (fetchMoradoresAprovados: () => void) => {
    return db.collection('moradores')
    .withConverter(converterMoradorFirebase)
    .where('aprovado', '==', true)
    .onSnapshot(() => {
      fetchMoradoresAprovados()
    })
  }

  const getAllMoradoresAprovados = () => {
    return db.collection('moradores')
    .withConverter(converterMoradorFirebase)
    .where('aprovado', '==', true)
    .get()
    .then((res) => {
      const moradores: iMorador[] = res.docs.map((doc) => {
        return {
          ...doc.data(),
          id: doc.id,
        }
      })

      return moradores
    })
    .catch((err) => {
      console.log(err)
      return [] as iMorador[]
    })
  }

  const getAllMoradoresDesaprovados = () => {
    return db.collection('moradores')
    .withConverter(converterMoradorFirebase)
    .where('aprovado', '==', false)
    .get()
    .then((res) => {
      const moradores: iMorador[] = res.docs.map((doc) => {
        return {
          ...doc.data(),
          id: doc.id,
        }
      })

      return moradores
    })
    .catch((err) => {
      console.log(err)
      return [] as iMorador[]
    })
  }

  const setAprovado = (morador: iMorador) => {
    db.collection('moradores')
    .withConverter(converterMoradorFirebase)
    .doc(morador.id)
    .set({
      ...morador,
      aprovado: true,
    })
    .catch((err) => {
      console.log(err)
      showToast('Algo deu errado.')
    })
  }

  return (
    <ContextoMoradores.Provider value={{
      getAllMoradoresAprovados,
      getAllMoradoresDesaprovados,
      setAprovado,
      adicionarAutoRefreshMoradoresReprovados,
      adicionarAutoRefreshMoradoresAprovados
    }}>
      {children}
    </ContextoMoradores.Provider >
  )
}

export default ContextoMoradoresProvider