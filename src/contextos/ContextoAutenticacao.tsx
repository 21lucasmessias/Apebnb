import React, { useEffect, useState } from 'react'

import moment from 'moment';

import { auth, db } from '../configs/firebase'

import { converterMoradorFirebase } from './ContextoMorador';
import { showToast } from '../utils/Animacoes';
import { converterReservaFirebase } from './ContextoReservas';

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

const ContextoAutenticacaoProvider: React.FC<iContextoAutenticacaoProvider> = ({ children }) => {
  const [user, setUser] = useState<iUser>({
    isAdmin: undefined,
    uid: null
  })

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (newUser) => {
      if (newUser) {
        try {
          const doc = await db.collection('moradores')
            .withConverter(converterMoradorFirebase)
            .doc(newUser.uid)
            .get()

          if (doc.exists) {
            await atualizarReservas(newUser.uid)

            setUser({
              isAdmin: doc.data()!.isAdmin,
              uid: newUser.uid
            })
          } else {
            showToast('Usuário excluído pelo administrador.', true)
            newUser.delete()
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


  const atualizarReservas = async(id: string) => {
    let hoje = moment(new Date())

    const reservas = await db.collection('reservas')
      .withConverter(converterReservaFirebase)
      .where('morador.id', '==', id)
      .get()

    const batch = db.batch()

    reservas.docs
      .filter((reserva) => {
        return reserva.data().data.ano < hoje.year() || reserva.data().data.mes < hoje.month()+1 || reserva.data().data.dia < hoje.date()
      })
      .map((reserva) => {
        batch.delete(reserva.ref)
      })

    await batch.commit()
  }

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
              isAdmin: false,
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