import React, { useContext, useEffect } from 'react'

import SplashScreen from "react-native-splash-screen";

import { ContextoAutenticacao } from './contextos/ContextoAutenticacao'
import RotasBottomTab from './rotasBottomTab'
import RotasAutenticacao from './telas/Autenticacao/rotas'

const Rotas: React.FC = () => {
  const { usuarioLogado } = useContext(ContextoAutenticacao)

  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide()
    }, 1500)
  }, [])

  return usuarioLogado ? (
    <RotasBottomTab />
  ) : (
    <RotasAutenticacao />
  )
}

export default Rotas