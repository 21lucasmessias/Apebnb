import React from 'react';

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'

import { createStackNavigator, StackCardInterpolationProps } from '@react-navigation/stack';
import Ambientes from '.';
import Ambiente from './Ambiente';
import { iAmbiente } from '../../models/Ambiente';
import { Cabecalho } from '../../componentes/Cabecalho';
import { RotasParamsList } from '../../rotas';
export type RotasAmbientesParamsList = {
  ambientes: undefined;
  ambiente: {
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
      <Screen name="ambiente" component={Ambiente} listeners={{
        focus: () => navigation.setOptions({
          tabBarVisible: false
        }),
      }}/>
    </Navigator>
  );
};

export default RotasAmbientes;
