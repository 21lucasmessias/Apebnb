import React, { useContext } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack';
import { RotasFuncionalidadesParamsList } from '../../rotasFuncionalidades';

import { ContextoAutenticacao } from '../../contextos/ContextoAutenticacao';
import ContextoMoradoresProvider from '../../contextos/ContextoMoradores';

import { iMorador } from '../../models/Morador';
import { forFade } from '../../utils/Animacoes';

import TelaPerfil from './Perfil';
import Moradores from './ListaMoradores';
import AdministrarMorador, { CabecalhoAdministrarMorador } from './AdministrarMorador';
import Solicitacoes from './Solicitacoes';
import AprovarMorador, { CabecalhoAprovarMorador } from './Solicitacoes/AprovarMorador';

import Cabecalho from '../../componentes/Cabecalho';

export type RotasMoradoresParamsList = {
  moradores: undefined,
  administrarMorador: {
    morador: iMorador
  },
  solicitacoes: undefined,
  aprovarMorador: {
    morador: iMorador
  },
  morador: undefined
};

const { Navigator, Screen } = createStackNavigator<RotasMoradoresParamsList>();

const RotasMoradores: React.FC<BottomTabScreenProps<RotasFuncionalidadesParamsList, 'moradores'>> = ({ navigation }) => {
  const { user } = useContext(ContextoAutenticacao)

  return (
    <NavigationContainer independent>
      { user.isAdmin ? (
        <ContextoMoradoresProvider>
          <Navigator
            headerMode='float'
            screenOptions={{
              cardStyleInterpolator: (props) => forFade(props),
              headerTransparent: true,
              cardStyle: { marginTop: 60 },
              header: props => <Cabecalho stackCabecalhoProps={props}/>,
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
              name="administrarMorador"
              component={AdministrarMorador}
              listeners={{
                focus: () => navigation.setOptions({
                  tabBarVisible: false
                }),
              }}
              options={{
                header: props => <CabecalhoAdministrarMorador props={props}/>
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
              options={{
                header: props => <CabecalhoAprovarMorador props={props}/>
              }}
            />
          </Navigator>
        </ContextoMoradoresProvider>
      ) : (
        <Navigator
          headerMode='float'
          screenOptions={{
            header: props => <Cabecalho stackCabecalhoProps={props}/>,
            cardStyleInterpolator: (props) => forFade(props),
            headerTransparent: true,
            cardStyle: {
              marginTop: 60
            },
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
