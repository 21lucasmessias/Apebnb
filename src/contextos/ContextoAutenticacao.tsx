import React, { useEffect, useState } from 'react'

import { auth, db } from '../configs/firebase'

import firebase from 'firebase'

import { ToastAndroid } from 'react-native';
import { iUsuario } from '../models/Usuario';

type iUser = {
  isAdmin: boolean | undefined,
  uid: string | null
}

interface iContextoAutenticacao {
  user: iUser,
  carregando: boolean,
  autenticar: (email: string, senha: string) => void,
  logout: () => void,
  criarConta: (nome: string, cpf: string, email: string, senha: string) => void,
  recuperarSenha: (email: string) => void
}

export const ContextoAutenticacao = React.createContext({} as iContextoAutenticacao)

type iContextoAutenticacaoProvider = {
  children: React.ReactNode
}

export const converterUsuarioFirebase = {
  toFirestore: (data: iUsuario) => data,
  fromFirestore: (snap: firebase.firestore.QueryDocumentSnapshot) => snap.data() as iUsuario
}

const ContextoAutenticacaoProvider: React.FC<iContextoAutenticacaoProvider> = ({ children }) => {
  const [user, setUser] = useState<iUser>({
    isAdmin: undefined,
    uid: null
  })
  const [carregando, setCarregando] = useState(false)

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        let usuarioAdmin: boolean | undefined = undefined

        db.collection('users')
        .withConverter(converterUsuarioFirebase)
        .doc(`${user.uid}`)
        .get()
        .then(doc => {
          if (doc.exists) {
            usuarioAdmin = doc.data()!.isAdmin
          }
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => {
          setUser({
            isAdmin: usuarioAdmin,
            uid: user.uid
          })
        })
      } else {
        setUser({
          isAdmin: undefined,
          uid: null
        })
      }
    })
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
        db.collection('moradores').doc(`${res.user.uid}`).set({
          nome: nome,
          cpf: cpf,
          email: email,
        })
        .catch((err) => {
          console.log(err)
        })

        db.collection('users').doc(`${res.user.uid}`).set({
          isAdmin: false
        })
        .catch((err) => {
          console.log(err)
        })
      }
    })
    .catch((err) => {
      ToastAndroid.showWithGravityAndOffset(
        'Credencias inválidas.',
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

  const recuperarSenha = (email: string) => {
    setCarregando(true)

    auth.sendPasswordResetEmail(email)
    .then((res) => {
      console.log(res)
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      setCarregando(false)
    })
  }

  return (
    <ContextoAutenticacao.Provider value={{
      user,
      carregando,
      autenticar,
      logout,
      criarConta,
      recuperarSenha
    }}>
      {children}
    </ContextoAutenticacao.Provider >
  )
}

export default ContextoAutenticacaoProvider