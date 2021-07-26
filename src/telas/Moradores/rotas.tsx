import React from 'react';

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'

import { createStackNavigator, StackCardInterpolationProps } from '@react-navigation/stack';
import { Cabecalho } from '../../componentes/Cabecalho';
import { RotasParamsList } from '../../rotas';
import { iMorador } from '../../models/Morador';
import Moradores from '.';
import CriarMorador from './CriarMorador';
import AdministrarMorador from './AdministrarMorador';
import Solicitacoes from './Solicitacoes';
import AprovarMorador from './Solicitacoes/AprovarMorador';

export type RotasMoradoresParamsList = {
  moradores: undefined;
  administrarMorador: {
    morador: iMorador
  };
  criarMorador: undefined;
  solicitacoes: undefined;
  aprovarMorador: {
    morador: iMorador
  }
};

const { Navigator, Screen } = createStackNavigator<RotasMoradoresParamsList>();

const RotasMoradores: React.FC<BottomTabScreenProps<RotasParamsList, 'moradores'>> = ({navigation}) => {
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
        <Screen name="moradores" component={Moradores} listeners={{
          focus: () => navigation.setOptions({
            tabBarVisible: true
          }),
        }}/>
        <Screen name="criarMorador" component={CriarMorador} listeners={{
          focus: () => navigation.setOptions({
            tabBarVisible: false
          }),
        }}/>
        <Screen name="administrarMorador" component={AdministrarMorador} listeners={{
          focus: () => navigation.setOptions({
            tabBarVisible: false
          }),
        }}/>
        <Screen name="solicitacoes" component={Solicitacoes} listeners={{
          focus: () => navigation.setOptions({
            tabBarVisible: false
          }),
        }}/>
        <Screen name="aprovarMorador" component={AprovarMorador} listeners={{
          focus: () => navigation.setOptions({
            tabBarVisible: false
          }),
        }}/>
    </Navigator>
  );
};

export default RotasMoradores;
