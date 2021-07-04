import React, { useEffect } from "react"

import { StatusBar } from 'react-native';

import SplashScreen from "react-native-splash-screen";

import { Rotas } from './src/rotas';

export const App: React.FC = () => {
  useEffect(() => {
    SplashScreen.hide()
  }, [])

  return (
    <>
      <StatusBar barStyle="default"/>
      <Rotas/>
    </>
  );
}