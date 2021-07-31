import React, { useContext, useEffect } from 'react'

import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'

import Background from '../../../assets/Background.png'
import LogoWhite from '../../../assets/LogoWhite.png'

import { ContextoTeclado } from '../../../contextos/ContextoTeclado'
import { semBouncing } from '../../../utils/Animacoes'
import { height, width } from '../../../utils/Utils'

export const HeaderAnimacoes: React.FC = () => {
  const { tecladoVisivel } = useContext(ContextoTeclado)

  const backgroundEnvolvedorHeight = useSharedValue(height/4)
  const backgroundEnvolvedorAnimacao = useAnimatedStyle(() => {
    return {
      height: backgroundEnvolvedorHeight.value
    }
  })

  const backgroundTop = useSharedValue(0)
  const backgroundAnimacao = useAnimatedStyle(() => {
    return {
      top: backgroundTop.value
    }
  })

  const logoHeight = useSharedValue(71)
  const logoWidth = useSharedValue(220)
  const logoRight = useSharedValue(width/4)
  const logoTop = useSharedValue(height/16)
  const logoAnimacao = useAnimatedStyle(() => {
    return {
      height: logoHeight.value,
      width: logoWidth.value,
      right: logoRight.value,
      top: logoTop.value
    }
  })

  const mostrarBackground = () => {
    backgroundEnvolvedorHeight.value = withSpring(height/4, semBouncing)

    backgroundTop.value = withSpring(0, semBouncing)

    logoHeight.value = withSpring(71, semBouncing)
    logoWidth.value = withSpring(220, semBouncing)
    logoRight.value = withSpring(width/4, semBouncing)
    logoTop.value = withSpring(height/16, semBouncing)
  }

  const esconderBackground = () => {
    backgroundEnvolvedorHeight.value = withSpring(80, semBouncing)

    backgroundTop.value = withSpring(-50, semBouncing)

    logoHeight.value = withSpring(30, semBouncing)
    logoWidth.value = withSpring(100, semBouncing)
    logoRight.value = withSpring(width/4, semBouncing)
    logoTop.value = withSpring(8, semBouncing)
  }


  useEffect(() => {
    if(!tecladoVisivel){
      esconderBackground()
    } else {
      mostrarBackground()
    }
  }, [tecladoVisivel])
  
  return (
    <Animated.View 
      style={[{
        justifyContent: 'center'
      }, backgroundEnvolvedorAnimacao]}
    >
      <Animated.Image
        resizeMethod='resize'
        resizeMode='stretch'
        source={Background}
        style={[{
          width: width,
          height: height/4
        }, backgroundAnimacao]}
      />
      <Animated.Image
        source={LogoWhite}
        resizeMethod='resize'
        style={[{
          position: 'absolute',
          alignSelf: 'center',
        }, logoAnimacao]}
      />
    </Animated.View>
  )
}