import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack';

import { RotasFuncionalidadesParamsList } from '../../rotasFuncionalidades';
import { iMorador } from '../../models/Morador';
import { forFade } from '../../utils/Animacoes';

import TelaPerfil from './Perfil';
import Moradores from './ListaMoradores';
import CriarMorador from './CriarMorador';
import AdministrarMorador from './AdministrarMorador';
import Solicitacoes from './Solicitacoes';
import AprovarMorador from './Solicitacoes/AprovarMorador';

import Cabecalho from '../../componentes/Cabecalho';
import { useContext } from 'react';
import { ContextoAutenticacao } from '../../contextos/ContextoAutenticacao';

export type RotasMoradoresParamsList = {
  moradores: undefined,
  administrarMorador: {
    morador: iMorador
  },
  criarMorador: undefined,
  solicitacoes: undefined,
  aprovarMorador: {
    morador: iMorador
  },
  morador: undefined
};

const { Navigator, Screen } = createStackNavigator<RotasMoradoresParamsList>();

type iRotasMoradores = BottomTabScreenProps<RotasFuncionalidadesParamsList, 'moradores'>;

const RotasMoradores: React.FC<iRotasMoradores> = ({ navigation }) => {
  const { user } = useContext(ContextoAutenticacao)

  return (
    <NavigationContainer independent>
      { user.isAdmin ? (
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
          }}
        >
          <Screen
            name="moradores"
            component={Moradores}
            listeners={{
              focus: () => navigation.setOptions({
                tabBarVisible: true
              }),
            }}
          />

          <Screen
            name="criarMorador"
            component={CriarMorador}
            listeners={{
              focus: () => navigation.setOptions({
                tabBarVisible: false
              }),
            }}
          />

          <Screen
            name="administrarMorador"
            component={AdministrarMorador}
            listeners={{
              focus: () => navigation.setOptions({
                tabBarVisible: false
              }),
            }}
          />

          <Screen
            name="solicitacoes"
            component={Solicitacoes}
            listeners={{
              focus: () => navigation.setOptions({
                tabBarVisible: false
              }),
            }}
          />

          <Screen
            name="aprovarMorador"
            component={AprovarMorador}
            listeners={{
              focus: () => navigation.setOptions({
                tabBarVisible: false
              }),
            }}
          />
        </Navigator>
      ) : (
        <Navigator
          headerMode='float'
          screenOptions={{
            header: props => (
              <Cabecalho
                stackCabecalhoProps={props}
                aoPressionarMais={() => {}}
              />
            ),
            cardStyleInterpolator: (props) => forFade(props)
          }}
        >
          <Screen
            name="morador"
            component={TelaPerfil}
          />
        </Navigator>
      )}
    </NavigationContainer>
  );
};

export default RotasMoradores;
