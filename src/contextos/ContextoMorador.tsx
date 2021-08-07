import React from 'react'

import firebase from 'firebase'
import { auth, db } from '../configs/firebase'

import { iMorador } from '../models/Morador';
import { ToastAndroid } from 'react-native';
import { useContext } from 'react';
import { ContextoAutenticacao } from './ContextoAutenticacao';

interface iContextoMorador {
  getDadosMorador: () => Promise<iMorador | undefined>,
  setDadosMorador: (morador: iMorador, password: string | null) => Promise<boolean>,
  adicionarListenerNomeMorador: (refreshUserNome: (nome: string) => void) => () => void
}

type iContextoMoradorProvider = {
  children: React.ReactNode
}

export const ContextoMorador = React.createContext({} as iContextoMorador)

export const converterMoradorFirebase = {
  toFirestore: (data: iMorador) => data,
  fromFirestore: (snap: firebase.firestore.QueryDocumentSnapshot) => snap.data() as iMorador
}

const showToast = () => ToastAndroid.showWithGravityAndOffset(
  "Dados invalidos.",
  ToastAndroid.SHORT,
  ToastAndroid.BOTTOM,
  0,
  120
)

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
      return dados
    })
  }

  const setDadosMorador = (morador: iMorador, password: string | null) => {  
    return new Promise<boolean>((res, rej) => {
      if(password){
        auth.currentUser!.updatePassword(password)
        .catch((err) => {
          showToast()
          console.log(`Error in updatePassword`, err)
          rej(false)
        })
      }
  
      db.collection('moradores')
      .withConverter(converterMoradorFirebase)
      .doc(`${user.uid}`)
      .set({
        foto: morador.foto,
        nome: morador.nome,
        email: morador.email,
        cpf: morador.cpf,
        numero: morador.numero
      })
      .catch((err) => {
        showToast()
        console.log(`Error in updateMorador`, err)
        rej(false)
      })

      res(true)
    })  
  }

  return (
    <ContextoMorador.Provider value={{
      getDadosMorador,
      setDadosMorador,
      adicionarListenerNomeMorador
    }}>
      {children}
    </ContextoMorador.Provider >
  )
}

export default ContextoMoradorProvider