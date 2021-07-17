import React from 'react'

import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import Icon from 'react-native-vector-icons/Feather'

import Ambientes from './telas/Ambientes'
import { Moradores } from './telas/Moradores'
import { Reservas } from './telas/Reservas'

import { tema } from './global/estilos/tema'
import RotasAmbientes from './telas/Ambientes/rotas'


export type RotasParamsList = {
  ambientes: undefined,
  moradores: undefined,
  reservas: undefined,
}

const { Navigator, Screen } = createBottomTabNavigator<RotasParamsList>()

export const Rotas = () => {
  return (
    <NavigationContainer>
      <Navigator
        tabBarOptions={{
          showLabel: false,
          style: {
            position: 'absolute',
            bottom: 18,
            left: 18,
            right: 18,
            borderRadius: 15,
            backgroundColor: tema.color.azulEscuro,
            elevation: 0,
          },
          keyboardHidesTabBar: true
        }}
      >
        <Screen component={RotasAmbientes} name='ambientes' 
          options={{
            tabBarIcon: ({ color, focused }) => (
              <Icon name='clock' size={24} color={focused ? tema.color.verdeClaro : color}/>
            )
          }}
        />
        <Screen component={Moradores} name='moradores'
          options={{
            tabBarIcon: ({ color, focused }) => (
              <Icon name='home' size={24} color={focused ? tema.color.verdeClaro : color}/>
            )
          }}
        />
        <Screen component={Reservas} name='reservas'
          options={{
            tabBarIcon: ({ color, focused }) => (
              <Icon name='user' size={24} color={focused ? tema.color.verdeClaro : color}/>
            )
          }}
        />
      </Navigator>
    </NavigationContainer>
  );
}