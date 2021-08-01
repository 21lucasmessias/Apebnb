import React from 'react'

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator, StackCardInterpolationProps } from '@react-navigation/stack'

import { RotasParamsList } from '../../rotasBottomTab'
import { iReserva } from '../../models/Reserva'

import Reservas from '.'

import Cabecalho from '../../componentes/Cabecalho'
import VisualizarReserva from './VisualizarReserva'

export type RotasReservasParamsList = {
  reservas: undefined
  visualizarReserva: {
    idReserva: iReserva['id']
  }
}

const { Navigator, Screen } = createStackNavigator<RotasReservasParamsList>()

const RotasReservas: React.FC<BottomTabScreenProps<RotasParamsList, 'reservas'>> = ({navigation}) => {
  const forFade = ({ current }: StackCardInterpolationProps) => ({
    cardStyle: {
      opacity: current.progress,
    },
  })

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
