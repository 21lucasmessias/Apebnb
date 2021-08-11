import React from 'react';

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import { forFade } from '../../utils/Animacoes';

import Ambientes from '.';
import AdministrarAmbiente, { CabecalhoAdministrarAmbiente } from './AdministrarAmbiente';
import VisualizarAmbiente from './VisualizarAmbiente';

import { iAmbiente } from '../../models/Ambiente';
import { RotasFuncionalidadesParamsList } from '../../rotasFuncionalidades';

import Cabecalho from '../../componentes/Cabecalho';
import ContextoAmbientesProvider from '../../contextos/ContextoAmbientes';
import CriarAmbienteScreen from './CriarAmbiente';

export type RotasAmbientesParamsList = {
  ambientes: undefined,
  visualizarAmbiente: {
    ambiente: iAmbiente
  },
  administrarAmbiente: {
    ambiente: iAmbiente
  },
  criarAmbiente: undefined
};

const { Navigator, Screen } = createStackNavigator<RotasAmbientesParamsList>();

const RotasAmbientes: React.FC<BottomTabScreenProps<RotasFuncionalidadesParamsList, 'ambientes'>> = ({navigation}) => {
  return (
    <ContextoAmbientesProvider>
      <NavigationContainer independent>
        <Navigator
          headerMode='float'
          screenOptions={{
            header: (props) => <Cabecalho stackCabecalhoProps={props}/>,
            cardStyleInterpolator: (props) => forFade(props),
            headerTransparent: true,
            cardStyle: { marginTop: 60 },
          }}
          
        >
          <Screen
            name="ambientes"
            component={Ambientes}
            listeners={{
              focus: () => navigation.setOptions({
                tabBarVisible: true
              }),
            }}
          />

          <Screen
            name="visualizarAmbiente"
            component={VisualizarAmbiente}
            listeners={{
              focus: () => navigation.setOptions({
                tabBarVisible: false
              }),
            }}
          />

          <Screen
            name="administrarAmbiente"
            component={AdministrarAmbiente}
            listeners={{
              focus: () => navigation.setOptions({
                tabBarVisible: false
              }),
            }}
            options={{
              header: (props) => <CabecalhoAdministrarAmbiente props={props}/>
            }}
          />

          <Screen
            name="criarAmbiente"
            component={CriarAmbienteScreen}
            listeners={{
              focus: () => navigation.setOptions({
                tabBarVisible: false
              }),
            }}
          />

        </Navigator>
      </NavigationContainer>
    </ContextoAmbientesProvider>
  );
};

export default RotasAmbientes;
