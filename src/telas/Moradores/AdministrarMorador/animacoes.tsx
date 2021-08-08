import React, { useContext, useEffect } from "react";
import { StyleSheet } from "react-native";

import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import Icon from 'react-native-vector-icons/Feather'

import { ContextoTeclado } from "../../../contextos/ContextoTeclado";

import { tema } from "../../../global/estilos/tema";
import { comBouncing, semBouncing } from "../../../utils/Animacoes";
import { width } from "../../../utils/Utils";

const AnimacoesAdministrarMorador: React.FC = () => {
  const { tecladoVisivel } = useContext(ContextoTeclado)

  const widthFoto = useSharedValue(width/3)
  const heightFoto = useSharedValue(width/3)
  const borderRadiusFoto = useSharedValue(width/3)
  
  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: widthFoto.value,
      height: heightFoto.value,
      borderRadius: borderRadiusFoto.value
    };
  });

  const esconderFoto = () => {
    widthFoto.value = withSpring(width - 24, semBouncing)
    heightFoto.value = withSpring(50, semBouncing)
    borderRadiusFoto.value = withSpring(15, comBouncing)
  }

  const mostrarFoto = () => {
    widthFoto.value = withSpring(width/3, semBouncing)
    heightFoto.value = withSpring(width/3, semBouncing)
    borderRadiusFoto.value = withSpring(width/3, comBouncing)
  }

  useEffect(() => {
    if(!tecladoVisivel){
      esconderFoto()
    } else {
      mostrarFoto()
    }
  }, [tecladoVisivel])

  return (
    <Animated.View style={[animatedStyle, styles.fotoConteiner]}>
      <Icon name='camera' size={24} color={tema.color.azulEscuro} />
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  fotoConteiner: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: tema.color.verdeAzulado,
  }
})

export default AnimacoesAdministrarMorador