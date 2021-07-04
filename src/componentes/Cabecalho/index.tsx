import React from 'react'

import { View } from 'react-native'

import Icon from 'react-native-vector-icons/Feather'
import Logo from '../../assets/Logo.png'

import { tema } from '../../global/estilos/tema'

import {
  Container,
  Touchable,
  Filler,
  Image
} from './estilos'

interface iCabecalho {
  showBack: boolean,
  onBack: () => void,
  onPressMore: () => void
}

export const Cabecalho: React.FC<iCabecalho> = ({showBack, onBack, onPressMore}) => {
  return(
    <Container>
      {!showBack ? <Filler></Filler> : 
        <Touchable onPress={onBack}>
          <Icon name='arrow-left' size={24} color={tema.color.ouro}/>
        </Touchable>
      }

      <Image source={Logo}/>

      <Touchable onPress={onPressMore}>
        <Icon name='more-vertical' size={24} color={tema.color.ouro}/>
      </Touchable>
    </Container>
  )
}
