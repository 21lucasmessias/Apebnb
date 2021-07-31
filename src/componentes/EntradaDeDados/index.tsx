import React, { useState, useEffect, useRef } from 'react'
import { StyleSheet, KeyboardTypeOptions, TextInputAndroidProps, TextInputProps, View } from 'react-native'

import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'

import Icon from 'react-native-vector-icons/Feather'
import { tema } from '../../global/estilos/tema'
import { comBouncing, semBouncing } from '../../utils/Animacoes'

import {
  EntradaTexto
} from './estilos'

interface iEntradaDeDados extends TextInputProps {
  valor: string,
  setValor: React.Dispatch<React.SetStateAction<string>>,
  nome: string,
  tipoTeclado?: KeyboardTypeOptions,
  tipoAutoCompletar?: TextInputAndroidProps['autoCompleteType'],
  validador: (entrada: string | undefined) => boolean,
}

const EntradaDeDados: React.FC<iEntradaDeDados> = (({ valor, setValor, tipoTeclado, tipoAutoCompletar, validador, nome, ...rest }) => {
  const entradaTextoRef = useRef(null)

  const [focado, setFocado] = useState(false);
  const [erro, setErro] = useState(false);
  const [verSenha, setVerSenha] = useState(false);

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
      topPlaceHolder.value = withSpring(-5, comBouncing)
      leftPlaceHolder.value = withSpring(4, comBouncing)
      colorPlaceHolder.value = tema.color.azulEscuro

      heightEnvolvedor.value = withSpring(90, semBouncing)
    } else {
      topPlaceHolder.value = withSpring(15, comBouncing)
      leftPlaceHolder.value = withSpring(20, comBouncing)
      colorPlaceHolder.value = tema.color.fosco

      heightEnvolvedor.value = withSpring(65, semBouncing)
    }
  }, [valor])

  return (
    <Animated.View style={[envolvedorAnimacao]}>
      <Animated.View        
        style={
          [styles.envolvedorEntrada,
            {
              borderWidth: 1,
              borderStyle: 'solid',
              borderColor: focado ? tema.color.azulEscuro : erro ? tema.color.magenta : tema.color.verdeAzulado
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

          secureTextEntry={tipoAutoCompletar == 'password' && !verSenha}

          keyboardType={tipoTeclado ? tipoTeclado : 'default'}
          autoCompleteType={tipoAutoCompletar}

          focado={focado}
          erro={erro}

          multiline={false}
          scrollEnabled={false}
          
          ref={entradaTextoRef}

          {...rest}
        />

        {tipoAutoCompletar == 'password' && (
          <View
            onTouchStart={() => {
              setVerSenha(!verSenha)
            }}
            style={{
              paddingRight: 12
            }}
          >
            <Icon name={verSenha ? 'eye' : 'eye-off'} size={24} color={tema.color.azulEscuro} />
          </View>
        )}
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

  envolvedorEntrada: {
    flexDirection: 'row',
    position: 'absolute',
    width: '100%',
    alignItems: 'center',
    borderRadius: 10,  
    backgroundColor: tema.color.branco,
    height: 55,
    bottom: 8
  }
})

export default EntradaDeDados