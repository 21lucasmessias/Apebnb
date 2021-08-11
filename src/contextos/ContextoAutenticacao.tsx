import React, { useEffect, useState } from 'react'

import firebase from 'firebase'
import { auth, db } from '../configs/firebase'

import { iUsuario } from '../models/Usuario';
import { converterMoradorFirebase } from './ContextoMorador';
import { showToast } from '../utils/Animacoes';

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
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        db.collection('users')
        .withConverter(converterUsuarioFirebase)
        .doc(user.uid)
        .get()
        .then(doc => {
          if (doc.exists) {
            setUser({
              isAdmin: doc.data()!.isAdmin,
              uid: user.uid
            })
          } else {
            showToast('Usuário excluído.')
            user.delete()
          }
        })
        .catch((err) => {
          console.log(err)
          showToast('Credencias inválidas.')
          setUser({
            isAdmin: undefined,
            uid: null
          })
        })
      } else {
        setUser({
          isAdmin: undefined,
          uid: null
        })
      }
    })
    
    return unsubscribe
  }, [])

  const autenticar = (email: string, senha: string) => {
    setCarregando(true)

    auth.signInWithEmailAndPassword(email, senha)
    .catch((err) => {
      console.log(err)
      showToast('Credencias inválidas.')
    })
    .finally(() => setCarregando(false))
  }

  const criarConta = (nome: string, cpf: string, email: string, senha: string) => {
    setCarregando(true)

    auth.createUserWithEmailAndPassword(email, senha)
    .then(async (res) => {
      if(res.user){
        db.collection('moradores')
        .withConverter(converterMoradorFirebase)
        .doc(`${res.user.uid}`)
        .set({
          id: res.user.uid,
          nome: nome,
          cpf: cpf,
          email: email,
          aprovado: false
        })
        .catch((err) => {
          console.log(err)
          showToast('Algo deu errado. Contate o desenvolvedor.')
        })

        db.collection('users')
        .doc(`${res.user.uid}`)
        .set({
          isAdmin: false
        })
        .catch((err) => {
          console.log(err)
          showToast('Algo deu errado. Contate o desenvolvedor.')
        })
      }
    })
    .catch((err) => {
      console.log(err)
      showToast('Credencias inválidas.')
    })
    .finally(() => {
      setCarregando(false)
    })
  }

  const logout = () => {
    auth.signOut()
    .catch(err => {
      console.log(err)
      showToast('Algo deu errado. Contate o desenvolvedor.')
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
      showToast('Algo deu errado. Contate o desenvolvedor.')
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