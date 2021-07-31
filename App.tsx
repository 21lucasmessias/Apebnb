import React, { useEffect } from "react"

import SplashScreen from "react-native-splash-screen";

import { Rotas } from './src/rotas';
import RotasAutenticacao from "./src/telas/Autenticacao/rotas";

export const App: React.FC = () => {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide()
    }, 1500)
  }, [])

  return (
    <RotasAutenticacao />
  );
}