import React from 'react'

import firebase from 'firebase'
import { db } from '../configs/firebase'

import { iReserva } from '../models/Reserva';
import { showToast } from '../utils/Animacoes';

interface iContextoReserva {
  criarReserva: (reserva: iReserva) => Promise<boolean>,
  listarReservasUsuario: (userId: string) => Promise<iReserva[]>
  atualizarReserva: (reserva: iReserva) => Promise<void>,
  cancelarReserva: (reserva: iReserva) => Promise<void>,
  adicionarListenerReservas: (refreshReservas: () => void) => () => void,
  listarTodasReservas: () => Promise<iReserva[]>
}

type iContextoReservaProvider = {
  children: React.ReactNode
}

export const ContextoReserva = React.createContext({} as iContextoReserva)

const converterReservaFirebase = {
  toFirestore: (data: iReserva) => data,
  fromFirestore: (snap: firebase.firestore.QueryDocumentSnapshot) => snap.data() as iReserva
}

const ContextoReservaProvider: React.FC<iContextoReservaProvider> = ({ children }) => {
  
  const criarReserva = async (reserva: iReserva) => {
    try {
      let resCreation = await db.collection('reservas')
        .withConverter(converterReservaFirebase)
        .add(reserva)
      
      await resCreation.update({
        id: resCreation.id
      })
      
      showToast('Reserva criada com sucesso.')

      return true
    } catch (err) {
      console.log(err)
      showToast('Um erro ocorreu. Contate o desenvolvedor.')
    }

    return false
  }

  const listarReservasUsuario = async (userId: string) => {
    try {
      let reservasUsuario = await db.collection('reservas')
        .withConverter(converterReservaFirebase)
        .where('userId', '==', userId)
        .get()

      if(reservasUsuario.empty) return []

      return reservasUsuario.docs.map(doc => doc.data())
    } catch (err) {
      console.log(err)
      showToast('Um erro ocorreu. Contate o desenvolvedor.')
    }

    return []
  }

  const atualizarReserva = async (reserva: iReserva) => {
    try {
      await db.collection('reservas')
        .withConverter(converterReservaFirebase)
        .doc(reserva.id)
        .update(reserva)

      showToast('Reserva atualizada com sucesso.')
    } catch (err) {
      console.log(err)
      showToast('Um erro ocorreu. Contate o desenvolvedor.')
    }
  }

  const cancelarReserva = async (reserva: iReserva) => {
    try {
      await db.collection('reservas')
        .withConverter(converterReservaFirebase)
        .doc(reserva.id)
        .delete()

      showToast('Reserva cancelada com sucesso.')
    } catch (err) {
      console.log(err)
      showToast('Um erro ocorreu. Contate o desenvolvedor.')
    }
  }

  const adicionarListenerReservas = (refreshReservas: () => void) => {
    return db.collection('reservas').onSnapshot(() => {
      refreshReservas()
    })
  }

  const listarTodasReservas = async () => {
    try {
      let reservas = await db.collection('reservas')
        .withConverter(converterReservaFirebase)
        .get()

      if(reservas.empty) return []

      return reservas.docs.map(doc => doc.data())
    } catch (err) {
      console.log(err)
      showToast('Um erro ocorreu. Contate o desenvolvedor.')
    }

    return []
  }
 
  return (
    <ContextoReserva.Provider value={{
      criarReserva,
      listarReservasUsuario,
      atualizarReserva,
      cancelarReserva,
      adicionarListenerReservas,
      listarTodasReservas
    }}>
      {children}
    </ContextoReserva.Provider >
  )
}

export default ContextoReservaProvider