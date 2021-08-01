import React from 'react';

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'

import { createStackNavigator, StackCardInterpolationProps } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import Ambientes from '.';
import AdministrarAmbiente from './AdministrarAmbiente';
import VisualizarAmbiente from './VisualizarAmbiente';

import { iAmbiente } from '../../models/Ambiente';
import { RotasParamsList } from '../../rotasBottomTab';

import Cabecalho from '../../componentes/Cabecalho';

export type RotasAmbientesParamsList = {
  ambientes: undefined;
  visualizarAmbiente: {
    ambiente: iAmbiente
  };
  administrarAmbiente: {
    ambiente: iAmbiente
  };
};

const { Navigator, Screen } = createStackNavigator<RotasAmbientesParamsList>();

const RotasAmbientes: React.FC<BottomTabScreenProps<RotasParamsList, 'ambientes'>> = ({navigation}) => {
  const forFade = ({ current }: StackCardInterpolationProps) => ({
    cardStyle: {
      opacity: current.progress,
    },
  });

  return (
    <NavigationContainer independent>
      <Navigator
        headerMode='float'
        screenOptions={{
          header: props => (
            <Cabecalho
              stackCabecalhoProps={props}
              aoPressionarMais={() => { }}
            />
          ),
          cardStyleInterpolator: (props) => forFade(props)
        }}>
        <Screen name="ambientes" component={Ambientes} listeners={{
          focus: () => navigation.setOptions({
            tabBarVisible: true
          }),
        }}/>
        <Screen name="visualizarAmbiente" component={VisualizarAmbiente} listeners={{
          focus: () => navigation.setOptions({
            tabBarVisible: false
          }),
        }}/>
        <Screen name="administrarAmbiente" component={AdministrarAmbiente} listeners={{
          focus: () => navigation.setOptions({
            tabBarVisible: false
          }),
        }}/>
      </Navigator>
    </NavigationContainer>
  );
};

export default RotasAmbientes;
