import React, { useContext, useEffect } from 'react'

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'

import { forFade } from './utils/Animacoes';

import { ContextoAutenticacao } from './contextos/ContextoAutenticacao'

import SplashScreen from "react-native-splash-screen";

import RotasFuncionalidades from './rotasFuncionalidades'
import RotasAutenticacao from './telas/Autenticacao/rotas'

export type RotasParamsList = {
  funcionalidades: undefined,
  autenticacao: undefined,
};

const { Navigator, Screen } = createStackNavigator<RotasParamsList>()

const Rotas:  React.FC = () => {
  const { user } = useContext(ContextoAutenticacao)

  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide()
    }, 1500)
  }, [])

  return (
    <NavigationContainer independent>
      <Navigator
        headerMode='none'
        screenOptions={{
          cardStyleInterpolator: (props) => forFade(props)
        }}
      >
        {
          user.uid ? (
            <Screen
              name='funcionalidades'
              component={RotasFuncionalidades}
            />
          ) : (
            <Screen
              name='autenticacao'
              component={RotasAutenticacao}
            />
          )
        }
      </Navigator>
    </NavigationContainer>
  )
}

export default Rotas