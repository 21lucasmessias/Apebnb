import React, { useEffect } from 'react'
import { StyleSheet, TextInput, TouchableWithoutFeedback } from 'react-native'

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring
} from 'react-native-reanimated'

import { tema } from '../../global/estilos/tema'
import { comBouncing, semBouncing } from '../../utils/Animacoes'

import { Texto } from './estilos'

interface iAnimacoesEntradaDeDados {
  valor: string,
  nome: string,
  entradaTextoRef: React.Ref<TextInput> | undefined
}

const AnimacoesEntradaDeDados: React.FC<iAnimacoesEntradaDeDados> = ({ valor, nome, entradaTextoRef, children }) => {
  const topPlaceHolder = useSharedValue(10)
  const leftPlaceHolder = useSharedValue(20)
  const colorPlaceHolder = useSharedValue(tema.color.fosco)

  const heightEnvolvedor = useSharedValue(65)

  const placeHolderAnimacao = useAnimatedStyle(() => {
    return {
      top: topPlaceHolder.value,
      left: leftPlaceHolder.value,
      color: colorPlaceHolder.value
    }
  })

  const envolvedorAnimacao = useAnimatedStyle(() => {
    return {
      height: heightEnvolvedor.value
    }
  })

  useEffect(() => {
    if(valor != ''){
      topPlaceHolder.value = withSpring(-8, comBouncing)
      leftPlaceHolder.value = withSpring(12, comBouncing)
      colorPlaceHolder.value = tema.color.azulEscuro

      heightEnvolvedor.value = withSpring(86, semBouncing)
    } else {
      topPlaceHolder.value = withSpring(15, comBouncing)
      leftPlaceHolder.value = withSpring(20, comBouncing)
      colorPlaceHolder.value = tema.color.fosco

      heightEnvolvedor.value = withSpring(65, semBouncing)
    }
  }, [valor])

  return (
    <Animated.View style={[envolvedorAnimacao]}>
      {children}

      <Animated.View 
        style={[styles.placeHolder, placeHolderAnimacao]} 
        focusable={false}
      >
        <TouchableWithoutFeedback
          onLongPress={() => {}}
          onPress={() => {
            // @ts-ignore: Unreachable code error
            if(!entradaTextoRef.current?.isFocused()) entradaTextoRef.current?.focus()
          }}
        >
          <Texto>
            {nome}
          </Texto>
        </TouchableWithoutFeedback>
      </Animated.View>
    </Animated.View>
  )
}


const styles = StyleSheet.create({
  placeHolder: {
    position: 'absolute',
  },
})

export default AnimacoesEntradaDeDados