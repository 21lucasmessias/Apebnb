import React, { useEffect } from "react"

import { StatusBar } from 'react-native';

import SplashScreen from "react-native-splash-screen";

import { Rotas } from './src/rotas';

export const App: React.FC = () => {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide()
    }, 1000)
  }, [])

  return (
    <Rotas />
  );
}