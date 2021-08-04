import React, { useEffect, useState } from 'react'

import { app, auth, db } from '../configs/firebase'

import { ToastAndroid } from 'react-native';

interface iContextoAutenticacao {
  userUid: string | null,
  autenticar: (email: string, senha: string) => void,
  logout: () => void,
  carregando: boolean,
  criarConta: (nome: string, cpf: string, email: string, senha: string) => void,
}

export const ContextoAutenticacao = React.createContext({} as iContextoAutenticacao)

type iContextoAutenticacaoProvider = {
  children: React.ReactNode
}

const ContextoAutenticacaoProvider: React.FC<iContextoAutenticacaoProvider> = ({ children }) => {
  const [userUid, setUserUid] = useState<string | null>(null)
  const [carregando, setCarregando] = useState(false)

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUserUid(user.uid)
      } else {
        setUserUid(null)
      }
    });
  }, [])

  const autenticar = (email: string, senha: string) => {
    setCarregando(true)

    auth.signInWithEmailAndPassword(email, senha)
    .then()
    .catch((err) => {
      ToastAndroid.showWithGravityAndOffset(
        "Credencias inválidas.",
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        0,
        120
      );
    })
    .finally(() => setCarregando(false))
  }

  const criarConta = (nome: string, cpf: string, email: string, senha: string) => {
    setCarregando(true)

    auth.createUserWithEmailAndPassword(email, senha)
    .then(async (res) => {
      if(res.user){
        db.collection("users").doc(`${res.user.uid}`).set({
          nome: nome,
          cpf: cpf,
          email: email
        })
        .catch((err) => {
          console.log(err)
        })
      }
    })
    .catch((err) => {
      ToastAndroid.showWithGravityAndOffset(
        "Credencias inválidas.",
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        0,
        120
      );
    })
    .finally(() => {
      setCarregando(false)
    })
  }

  const logout = () => {
    auth.signOut()
    .catch(err => {
      console.log(err)
    })
  }

  return (
    <ContextoAutenticacao.Provider value={{
      userUid,
      autenticar,
      logout,
      carregando,
      criarConta
    }}>
      {children}
    </ContextoAutenticacao.Provider >
  )
}

export default ContextoAutenticacaoProvider