import React, { useContext, useEffect } from 'react'

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, StackCardInterpolationProps } from '@react-navigation/stack'

import { ContextoAutenticacao } from './contextos/ContextoAutenticacao'

import SplashScreen from "react-native-splash-screen";

import RotasBottomTab from './rotasBottomTab'
import RotasAutenticacao from './telas/Autenticacao/rotas'

export type RotasParamsList = {
  funcionalidades: undefined;
  autenticacao: undefined;
};

const { Navigator, Screen } = createStackNavigator<RotasParamsList>()

const Rotas: React.FC = () => {
  const { usuarioLogado } = useContext(ContextoAutenticacao)

  const forFade = ({ current }: StackCardInterpolationProps) => ({
    cardStyle: {
      opacity: current.progress,
    },
  });

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
          usuarioLogado ? (
            <Screen
              name='funcionalidades'
              component={RotasBottomTab}
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