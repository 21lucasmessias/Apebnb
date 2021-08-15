import React, { useEffect, useState } from 'react'

import firebase from 'firebase'
import { auth, db } from '../configs/firebase'

import { converterMoradorFirebase } from './ContextoMorador';
import { showToast } from '../utils/Animacoes';
import { iMorador } from '../models/Morador';

type iUser = {
  isAdmin: boolean | undefined,
  uid: string | null
}

interface iContextoAutenticacao {
  user: iUser,
  autenticar: (email: string, senha: string) => Promise<void>,
  criarConta: (nome: string, cpf: string, email: string, senha: string) => Promise<void>,
  logout: () => Promise<void>,
  recuperarSenha: (email: string) => Promise<void>
}

export const ContextoAutenticacao = React.createContext({} as iContextoAutenticacao)

type iContextoAutenticacaoProvider = {
  children: React.ReactNode
}

export const converterUsuarioFirebase = {
  toFirestore: (data: iMorador) => data,
  fromFirestore: (snap: firebase.firestore.QueryDocumentSnapshot) => snap.data() as iMorador
}

const ContextoAutenticacaoProvider: React.FC<iContextoAutenticacaoProvider> = ({ children }) => {
  const [user, setUser] = useState<iUser>({
    isAdmin: undefined,
    uid: null
  })

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          const doc = await db.collection('users')
            .withConverter(converterUsuarioFirebase)
            .doc(user.uid)
            .get()
    
          if (doc.exists) {
            setUser({
              isAdmin: doc.data()!.isAdmin,
              uid: user.uid
            })
          } else {
            showToast('Usuário excluído.')
            user.delete()
          }
        } catch(err) {
          console.log(err)
          showToast('Credencias inválidas.')
          setUser({
            isAdmin: undefined,
            uid: null
          })
        }
      } else {
        setUser({
          isAdmin: undefined,
          uid: null
        })
      }
    })
    
    return unsubscribe
  }, [])

  const autenticar = async (email: string, senha: string) => {
    try {
      await auth.signInWithEmailAndPassword(email, senha)
    } catch(err) {
      console.log(err)
      showToast('Credencias inválidas.')
    }
  }

  const criarConta = async (nome: string, cpf: string, email: string, senha: string) => {
    try{
      const res = await auth.createUserWithEmailAndPassword(email, senha)

      if(res.user){
        try {
          await db.collection('moradores')
            .withConverter(converterMoradorFirebase)
            .doc(`${res.user.uid}`)
            .set({
              id: res.user.uid,
              nome: nome,
              cpf: cpf,
              email: email,
              aprovado: false,
              isAdmin: false
            })
        } catch(err) {
          console.log(err)
          showToast('Algo deu errado. Contate o desenvolvedor.')
        }
      }
    } catch(err) {
      console.log(err)
      showToast('Credencias inválidas.')
    }
  }

  const logout = async () => {
    try {
      await auth.signOut()
    } catch(err) {
      console.log(err)
      showToast('Algo deu errado. Contate o desenvolvedor.')
    }
  }

  const recuperarSenha = async (email: string) => {
    try {
      await auth.sendPasswordResetEmail(email)
    } catch(err){
      console.log(err)
      showToast('Algo deu errado. Contate o desenvolvedor.')
    }
  }

  return (
    <ContextoAutenticacao.Provider value={{
      user,
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