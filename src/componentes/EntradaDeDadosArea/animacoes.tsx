import React, { useEffect } from 'react'
import { StyleSheet, TextInput, TextInputProps } from 'react-native'

import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'

import { tema } from '../../global/estilos/tema'
import { comBouncing, semBouncing } from '../../utils/Animacoes'

interface iAnimacoesEntradaDeDadosArea extends TextInputProps {
  valor: string,
  nome: string,
  entradaTextoRef: React.Ref<TextInput> | undefined  
}

const AnimacoesEntradaDeDadosArea: React.FC<iAnimacoesEntradaDeDadosArea> = (({ valor, nome, entradaTextoRef, children }) => {
  const topPlaceHolder = useSharedValue(10)
  const leftPlaceHolder = useSharedValue(20)
  const colorPlaceHolder = useSharedValue(tema.color.fosco)

  const heightEnvolvedor = useSharedValue(140)

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
      topPlaceHolder.value = withSpring(0, comBouncing)
      leftPlaceHolder.value = withSpring(4, comBouncing)
      colorPlaceHolder.value = tema.color.azulEscuro

      heightEnvolvedor.value = withSpring(170, semBouncing)
    } else {
      topPlaceHolder.value = withSpring(12, comBouncing)
      leftPlaceHolder.value = withSpring(20, comBouncing)
      colorPlaceHolder.value = tema.color.fosco

      heightEnvolvedor.value = withSpring(140, semBouncing)
    }
  }, [valor])

  return (
    <Animated.View style={[styles.envolvedor, envolvedorAnimacao]}>
      {children}

      <Animated.Text
        // @ts-ignore: Unreachable code error
        onPress={() => entradaTextoRef.current?.focus()}
        style={[styles.placeHolder, placeHolderAnimacao]}
      >
        {nome}
      </Animated.Text>

    </Animated.View>
  )
})

const styles = StyleSheet.create({
  placeHolder: {
    position: 'absolute',
    fontFamily: tema.fontes.WorkSans,
    fontSize: 20,
  },

  envolvedor: {
    width: '100%',
    justifyContent: 'flex-end'
  },
})

export default AnimacoesEntradaDeDadosArea