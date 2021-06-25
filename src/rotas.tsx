import React, { useEffect } from "react"

import { NavigationContainer } from '@react-navigation/native';
import { StatusBar, View } from 'react-native';
import SplashScreen from "react-native-splash-screen";
import { tema } from "./global/estilos/tema";


export const Rotas = () => {
  useEffect(() => {
    SplashScreen.hide()
  }, [])

  return (
    <>
      <StatusBar barStyle="light-content"/>

      <NavigationContainer>
        <View style={{flex: 1, backgroundColor: tema.color.azulEscuro}}>

        </View>
      </NavigationContainer>
    </>
  );
}