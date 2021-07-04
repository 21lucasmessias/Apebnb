import React from 'react'
import { View, Text } from 'react-native'

import { Cabecalho } from '../../componentes/Cabecalho'

export const Inicio: React.FC = () => {
  return (
    <>
      <Cabecalho showBack={false} onBack={() => {}} onPressMore={() => {}} />
      <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
        <Text style={{color: "red"}}>
          Inicio
        </Text>
      </View>
    </>
  )
}
