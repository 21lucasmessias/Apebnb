import React, { useEffect, useState } from 'react'

import firebase from "firebase";
import "firebase/auth";
import "firebase/storage"

import {
  API_KEY,
  APP_ID,
  AUTH_DOMAIN,
  MEASUREMENT_ID,
  MESSAGING_SENDER_ID,
  PROJECT_ID,
  STORAGE_BUCKET
} from 'react-native-dotenv'

interface iContextoAutenticacao {
  usuarioLogado: string | undefined,
  autenticar: (email: string, senha: string) => void,
  logout: () => void
}

export const ContextoAutenticacao = React.createContext({} as iContextoAutenticacao)

type iContextoAutenticacaoProvider = {
  children: React.ReactNode
}

const ContextoAutenticacaoProvider: React.FC<iContextoAutenticacaoProvider> = ({ children }) => {
  const [usuarioLogado, setUsuarioLogado] = useState<string | undefined>()

  useEffect(() => {
    inicializarFirebase()

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUsuarioLogado(user.uid)
      } else {
        setUsuarioLogado(undefined)
      }
    });
  }, [])

  const inicializarFirebase = () => {
    var firebaseConfig = {
      apiKey: API_KEY,
      authDomain: AUTH_DOMAIN,
      projectId: PROJECT_ID,
      storageBucket: STORAGE_BUCKET,
      messagingSenderId: MESSAGING_SENDER_ID,
      appId: APP_ID,
      measurementId: MEASUREMENT_ID
    };

    if(!firebase.apps.length){
      firebase.initializeApp(firebaseConfig);
    } else {
      firebase.app()
    }
  }

  const autenticar = (email: string, senha: string) => {
    firebase
    .auth()
    .signInWithEmailAndPassword(email, senha)
    .catch((err) => {
      console.log(err)
    })
  }

  const logout = () => {
    firebase
    .auth()
    .signOut()
    .catch(err => {
      console.log(err)
    })
  }

  return (
    <ContextoAutenticacao.Provider value={{
      usuarioLogado: usuarioLogado,
      autenticar: autenticar,
      logout: logout
    }}>
      {children}
    </ContextoAutenticacao.Provider >
  )
}

export default ContextoAutenticacaoProvider