import React, {useContext, useEffect} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {animacaoDesaparecer} from './utils/Animacoes';

import {ContextoAutenticacao} from './contextos/ContextoAutenticacao';

import SplashScreen from 'react-native-splash-screen';

import RotasFuncionalidades from './rotasFuncionalidades';
import RotasAutenticacao from './telas/Autenticacao/rotas';

export type RotasParametrosLista = {
  funcionalidades: undefined;
  autenticacao: undefined;
};

const {Navigator, Screen} = createStackNavigator<RotasParametrosLista>();

const Rotas: React.FC = () => {
  const {usuario: user} = useContext(ContextoAutenticacao);

  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 1500);
  }, []);

  return (
    <NavigationContainer independent>
      <Navigator
        headerMode="none"
        screenOptions={{
          cardStyleInterpolator: props => animacaoDesaparecer(props),
        }}>
        {user.uid ? (
          <Screen name="funcionalidades" component={RotasFuncionalidades} />
        ) : (
          <Screen name="autenticacao" component={RotasAutenticacao} />
        )}
      </Navigator>
    </NavigationContainer>
  );
};

export default Rotas;
