import React from 'react'

import ContextoMoradorProvider from './contextos/ContextoMorador'

import Icon from 'react-native-vector-icons/Feather'

import { tema } from './global/estilos/tema'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { StackScreenProps } from '@react-navigation/stack'
import { RotasParamsList } from './rotas'

import RotasAmbientes from './telas/Ambientes/rotas'
import RotasMoradores from './telas/Moradores/rotas'
import RotasReservas from './telas/Reservas/rotas'

import TabBar from './componentes/TabBar'
import { height } from './utils/Utils'

export type RotasFuncionalidadesParamsList = {
  ambientes: undefined,
  moradores: undefined,
  reservas: undefined,
}

const { Navigator, Screen } = createBottomTabNavigator<RotasFuncionalidadesParamsList>()

const RotasFuncionalidades: React.FC<StackScreenProps<RotasParamsList, 'funcionalidades'>>  = () => {
  return (
    <ContextoMoradorProvider>
      <Navigator
        tabBarOptions={{
          showLabel: false,
          style: {
            position: 'absolute',
            top: height - 124,
            marginHorizontal: 18,
            borderRadius: 15,
            backgroundColor: tema.color.azulEscuro,
          },
        }}
      >
        <Screen component={RotasAmbientes} name='ambientes'
          options={{
            tabBarIcon: ({ color, focused }) => (
              <Icon
                name='home'
                size={24}
                color={focused ? tema.color.branco : color}
              />
            )
          }}
        />
        <Screen component={RotasReservas} name='reservas'
          options={{
            tabBarIcon: ({ color, focused }) => (
              <Icon
                name='clock'
                size={24}
                color={focused ? tema.color.branco : color}
              />
            )
          }}
        />
        <Screen
          component={RotasMoradores}
          name='moradores'
          options={{
            tabBarIcon: ({ color, focused }) => (
              <Icon
                name='user'
                size={24}
                color={focused ? tema.color.branco : color}
              />
            )
          }}
        />
      </Navigator>
    </ContextoMoradorProvider>
  )
}

export default RotasFuncionalidades