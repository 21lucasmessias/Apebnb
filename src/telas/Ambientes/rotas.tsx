import React from 'react';

import { createStackNavigator, StackCardInterpolationProps } from '@react-navigation/stack';
import Ambientes from '.';
import Ambiente from './Ambiente';
import { iAmbiente } from '../../models/Ambiente';
import { Cabecalho } from '../../componentes/Cabecalho';

export type RotasAmbientesParamsList = {
  ambientes: undefined;
  ambiente: {
    ambiente: iAmbiente;
  };
};

const { Navigator, Screen } = createStackNavigator<RotasAmbientesParamsList>();

const RotasAmbientes: React.FC = () => {
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
      <Screen name="ambientes" component={Ambientes} />
      <Screen name="ambiente" component={Ambiente} />
    </Navigator>
  );
};

export default RotasAmbientes;
