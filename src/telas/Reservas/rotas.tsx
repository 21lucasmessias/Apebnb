import React from 'react'

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'

import { createStackNavigator, StackCardInterpolationProps } from '@react-navigation/stack'
import { RotasParamsList } from '../../rotas'

import { Cabecalho } from '../../componentes/Cabecalho'
import { iReserva } from '../../models/Reserva'
import { Reservas } from '.'
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
      <Screen name="reservas" component={Reservas} listeners={{
        focus: () => navigation.setOptions({
          tabBarVisible: true
        }),
      }}/>
      <Screen name="visualizarReserva" component={VisualizarReserva} listeners={{
        focus: () => navigation.setOptions({
          tabBarVisible: false
        }),
      }}/>
    </Navigator>
  )
}

export default RotasReservas
