import React from 'react'
import { useEffect } from 'react'
import { TouchableOpacity } from 'react-native'
import { StyleSheet, Text } from 'react-native'

import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated'

import Icon from 'react-native-vector-icons/Feather'

import { tema } from '../../global/estilos/tema'

export interface iCabecalhoItem {
  item: {
    nome: string,
    texto: string,
    acao: () => void
  },
  index: number,
  lenght: number,
  visivel: boolean
}

const CabecalhoItem: React.FC<iCabecalhoItem> = ({ index, item, visivel, lenght }) => {
  const opacidadeItem = useSharedValue(0)
  const animacaoOpacidade = useAnimatedStyle(() => {
    return {
      opacity: opacidadeItem.value
    }
  })

  useEffect(() => {
    if(visivel) {
      opacidadeItem.value = withTiming(1, {
        duration: (index+1)*200
      })
    } else {
      opacidadeItem.value = withTiming(0, {
        duration: (lenght-index)*200
      })
    }
  }, [visivel])

  return (
    <Animated.View
      key={`${item.nome}${item.texto}${index}`}
      onTouchStart={item.acao}
      style={[
        animacaoOpacidade,
        styles.conteinerItem,
      ]}>
        <TouchableOpacity style={styles.touchable}>
          <Icon name={item.nome} size={24} color={tema.color.ouro}/>
          <Text style={styles.text}>{item.texto}</Text>
        </TouchableOpacity>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  conteinerItem: {
    alignSelf: 'flex-end',
    flexDirection: 'row',
    padding: 8,
    width: 120,
    backgroundColor: tema.color.azulEscuro,
    borderRadius: 10,
    marginHorizontal: 8,
    marginVertical: 2
  },
  text: {
    flex: 1,
    fontFamily: tema.fontes.WorkSans,
    fontSize: 18,
    color: tema.color.ouro,
    paddingLeft: 12,
  },
  touchable: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  }
})

export default CabecalhoItem