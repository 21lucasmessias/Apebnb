import React from 'react'

import { Platform } from 'react-native'
import { BottomTabDescriptorMap, BottomTabNavigationEventMap } from '@react-navigation/bottom-tabs/lib/typescript/src/types'
import { NavigationHelpers, ParamListBase, TabNavigationState } from '@react-navigation/native'

import { BottomTabBar } from '@react-navigation/bottom-tabs'
import { useContext } from 'react'
import { ContextoTeclado } from '../../contextos/ContextoTeclado'

interface iTabBar {
  state: TabNavigationState<ParamListBase>,
  descriptors: BottomTabDescriptorMap,
  navigation: NavigationHelpers<ParamListBase, BottomTabNavigationEventMap>
}

const TabBar: React.FC<iTabBar> = ({ ...props }) => {
  const {
    tecladoVisivel
  } = useContext(ContextoTeclado)

  const render = () => {
    if (Platform.OS === 'ios') {
      return <BottomTabBar {...props} />
    }
    if (!tecladoVisivel) return null
    return <BottomTabBar {...props} />
  }

  return render()
}

export default TabBar