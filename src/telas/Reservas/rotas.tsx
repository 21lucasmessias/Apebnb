import React from 'react'

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import { RotasFuncionalidadesParamsList } from '../../rotasFuncionalidades'
import { iReserva } from '../../models/Reserva'
import { forFade } from '../../utils/Animacoes'

import Cabecalho from '../../componentes/Cabecalho'

import Reservas from '.'
import VisualizarReserva from './VisualizarReserva'

export type RotasReservasParamsList = {
  reservas: undefined
  visualizarReserva: {
    reserva: iReserva
  }
}

const { Navigator, Screen } = createStackNavigator<RotasReservasParamsList>()

const RotasReservas: React.FC<BottomTabScreenProps<RotasFuncionalidadesParamsList, 'reservas'>> = ({navigation}) => {
  return (
    <NavigationContainer independent>
      <Navigator
        headerMode='float'
        screenOptions={{
          header: props => (
            <Cabecalho
              stackCabecalhoProps={props}
            />
          ),
          cardStyleInterpolator: (props) => forFade(props),
          headerTransparent: true,
          cardStyle: {
            marginTop: 55
          },
        }}>
        <Screen
          name="reservas"
          component={Reservas}
          listeners={{
            focus: () => navigation.setOptions({
              tabBarVisible: true
            }),
          }}
        />
        <Screen
          name="visualizarReserva"
          component={VisualizarReserva}
          listeners={{
            focus: () => navigation.setOptions({
              tabBarVisible: false
            })
          }}
        />
      </Navigator>
    </NavigationContainer>
  )
}

export default RotasReservas
