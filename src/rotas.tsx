import React from 'react'

import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import ContextoTecladoProvider from './contextos/ContextoTeclado'

import Icon from 'react-native-vector-icons/Feather'
import { tema } from './global/estilos/tema'

import RotasAmbientes from './telas/Ambientes/rotas'
import RotasMoradores from './telas/Moradores/rotas'
import RotasReservas from './telas/Reservas/rotas'

export type RotasParamsList = {
  ambientes: undefined,
  moradores: undefined,
  reservas: undefined,
}
import TabBar from './componentes/TabBar'

const { Navigator, Screen } = createBottomTabNavigator<RotasParamsList>()

export const Rotas = () => {
  return (
    <ContextoTecladoProvider>
      <NavigationContainer>
        <Navigator
          tabBarOptions={{
            showLabel: false,
            style: {
              elevation: 0,
              position: 'absolute',
              bottom: 8,
              left: 18,
              right: 18,
              borderRadius: 15,
              backgroundColor: tema.color.azulEscuro,
              borderTopWidth: 0,
            },
            keyboardHidesTabBar: true,
          }}
          tabBar={(props) => <TabBar {...props} />}
        >
          <Screen component={RotasReservas} name='reservas'
            options={{
              tabBarIcon: ({ color, focused }) => (
                <Icon
                  name='clock'
                  size={24}
                  color={focused ? tema.color.verdeClaro : color}
                />
              )
            }}
          />
          <Screen component={RotasAmbientes} name='ambientes'
            options={{
              tabBarIcon: ({ color, focused }) => (
                <Icon
                  name='home'
                  size={24}
                  color={focused ? tema.color.verdeClaro : color}
                />
              )
            }}
          />
          <Screen component={RotasMoradores} name='moradores'
            options={{
              tabBarIcon: ({ color, focused }) => (
                <Icon
                  name='user'
                  size={24}
                  color={focused ? tema.color.verdeClaro : color}
                />
              )
            }}
          />
        </Navigator>
      </NavigationContainer>
    </ContextoTecladoProvider>
  );
}