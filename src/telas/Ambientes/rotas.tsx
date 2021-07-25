import React from 'react';

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'

import { createStackNavigator, StackCardInterpolationProps } from '@react-navigation/stack';
import Ambientes from '.';
import AdministrarAmbiente from './AdministrarAmbiente';
import { iAmbiente } from '../../models/Ambiente';
import { Cabecalho } from '../../componentes/Cabecalho';
import { RotasParamsList } from '../../rotas';
import VisualizarAmbiente from './VisualizarAmbiente';

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
  );
};

export default RotasAmbientes;
