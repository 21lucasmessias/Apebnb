import React from 'react'

import Icon from 'react-native-vector-icons/Feather'
import Logo from '../../assets/Logo.png'

import { tema } from '../../global/estilos/tema'

import {
  Envolvedor,
  Pressionavel,
  Filler,
  Imagem
} from './estilos'
import { StackHeaderProps } from '@react-navigation/stack'

interface iCabecalho {
  aoPressionarMais: () => void,
  stackCabecalhoProps: StackHeaderProps
}

export const Cabecalho: React.FC<iCabecalho> = ({aoPressionarMais, stackCabecalhoProps}) => {
  return(
    <Envolvedor>
      {!stackCabecalhoProps.navigation.canGoBack() ? <Filler></Filler> : 
        <Pressionavel onPress={stackCabecalhoProps.navigation.goBack}>
          <Icon name='arrow-left' size={24} color={tema.color.ouro}/>
        </Pressionavel>
      }

      <Imagem source={Logo}/>

      <Pressionavel onPress={aoPressionarMais}>
        <Icon name='more-vertical' size={24} color={tema.color.ouro}/>
      </Pressionavel>
    </Envolvedor>
  )
}
