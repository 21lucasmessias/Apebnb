import React, { useState, useEffect, useRef } from 'react'
import { StyleSheet, KeyboardTypeOptions, TextInputAndroidProps, TextInputProps, View } from 'react-native'

import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'

import Icon from 'react-native-vector-icons/Feather'
import { tema } from '../../global/estilos/tema'
import { comBouncing, semBouncing } from '../../utils/Animacoes'

import {
  EntradaTexto
} from './estilos'

interface iEntradaDeDadosArea extends TextInputProps {
  valor: string,
  setValor: React.Dispatch<React.SetStateAction<string>>,
  nome: string,
  validador: (entrada: string | undefined) => boolean,
}

const EntradaDeDadosArea: React.FC<iEntradaDeDadosArea> = (({ valor, setValor, validador, nome, ...rest }) => {
  const entradaTextoRef = useRef(null)

  const [focado, setFocado] = useState(false);
  const [erro, setErro] = useState(false);

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
      <Animated.View        
        style={
          [styles.envolvedorEntrada,
            {
              borderWidth: 1,
              borderStyle: 'solid',
              borderColor: focado ? tema.color.azulEscuro : erro ? tema.color.magenta : tema.color.verdeAzulado,
            }
          ]
        }
      >
        <EntradaTexto
          value={valor}
          onChangeText={setValor}

          onFocus={() => {
            setFocado(true)
          }}

          onEndEditing={() => {
            setFocado(false)
            setErro(!validador(valor))
          }}

          focado={focado}
          erro={erro}

          multiline
          scrollEnabled
          textAlignVertical='top'
          
          ref={entradaTextoRef}

          {...rest}
        />
      </Animated.View>


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

  envolvedorEntrada: {
    height: 140,
    width: '100%',
    borderRadius: 10,  
    backgroundColor: tema.color.branco,
  }
})

export default EntradaDeDadosArea