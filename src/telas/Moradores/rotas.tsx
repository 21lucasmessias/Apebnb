import React, {useContext} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {RotasFuncionalidadesParametrosLista} from '../../rotasFuncionalidades';

import {ContextoAutenticacao} from '../../contextos/ContextoAutenticacao';
import ContextoMoradoresProvider from '../../contextos/ContextoMoradores';

import {iMorador} from '../../models/Morador';
import {animacaoDesaparecer} from '../../utils/Animacoes';

import TelaPerfil from './Perfil';
import Moradores from './ListaMoradores';
import AdministrarMorador, {
  CabecalhoAdministrarMorador,
} from './AdministrarMorador';
import Solicitacoes from './Solicitacoes';
import AprovarMorador, {
  CabecalhoAprovarMorador,
} from './Solicitacoes/AprovarMorador';

import Cabecalho from '../../componentes/Cabecalho';

export type RotasMoradoresParametrosLista = {
  moradores: undefined;
  administrarMorador: {
    morador: iMorador;
  };
  solicitacoes: undefined;
  aprovarMorador: {
    morador: iMorador;
  };
  morador: undefined;
};

const {Navigator, Screen} =
  createStackNavigator<RotasMoradoresParametrosLista>();

const RotasMoradores: React.FC<
  BottomTabScreenProps<RotasFuncionalidadesParametrosLista, 'moradores'>
> = ({navigation}) => {
  const {usuario} = useContext(ContextoAutenticacao);

  return (
    <NavigationContainer independent>
      {usuario.usuarioAdministrador ? (
        <ContextoMoradoresProvider>
          <Navigator
            headerMode="float"
            screenOptions={{
              cardStyleInterpolator: props => animacaoDesaparecer(props),
              headerTransparent: true,
              cardStyle: {marginTop: 55},
              header: props => <Cabecalho stackCabecalhoProps={props} />,
            }}>
            <Screen
              name="moradores"
              component={Moradores}
              listeners={{
                focus: () =>
                  navigation.setOptions({
                    tabBarVisible: true,
                  }),
              }}
            />

            <Screen
              name="administrarMorador"
              component={AdministrarMorador}
              listeners={{
                focus: () =>
                  navigation.setOptions({
                    tabBarVisible: false,
                  }),
              }}
              options={{
                header: props => <CabecalhoAdministrarMorador props={props} />,
              }}
            />

            <Screen
              name="solicitacoes"
              component={Solicitacoes}
              listeners={{
                focus: () =>
                  navigation.setOptions({
                    tabBarVisible: false,
                  }),
              }}
            />

            <Screen
              name="aprovarMorador"
              component={AprovarMorador}
              listeners={{
                focus: () =>
                  navigation.setOptions({
                    tabBarVisible: false,
                  }),
              }}
              options={{
                header: props => <CabecalhoAprovarMorador props={props} />,
              }}
            />
          </Navigator>
        </ContextoMoradoresProvider>
      ) : (
        <Navigator
          headerMode="float"
          screenOptions={{
            header: props => <Cabecalho stackCabecalhoProps={props} />,
            cardStyleInterpolator: props => animacaoDesaparecer(props),
            headerTransparent: true,
            cardStyle: {
              marginTop: 55,
            },
          }}>
          <Screen name="morador" component={TelaPerfil} />
        </Navigator>
      )}
    </NavigationContainer>
  );
};

export default RotasMoradores;
