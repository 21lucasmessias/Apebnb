import React from 'react'

import Icon from 'react-native-vector-icons/Feather'
import Logo from '../../assets/LogoStack.png'

import { tema } from '../../global/estilos/tema'

import {
  Envolvedor,
  Pressionavel,
  Filler,
  Imagem
} from './estilos'
import { StackHeaderProps } from '@react-navigation/stack'
import { useContext } from 'react'
import { ContextoAutenticacao } from '../../contextos/ContextoAutenticacao'

interface iCabecalho {
  aoPressionarMais: () => void,
  stackCabecalhoProps?: StackHeaderProps
}

const Cabecalho: React.FC<iCabecalho> = ({aoPressionarMais, stackCabecalhoProps}) => {
  const {
    logout
  } = useContext(ContextoAutenticacao)

  return(
    <Envolvedor>
      {!stackCabecalhoProps?.navigation.canGoBack() ? <Filler></Filler> : 
        <Pressionavel onPress={stackCabecalhoProps.navigation.goBack}>
          <Icon name='arrow-left' size={24} color={tema.color.ouro}/>
        </Pressionavel>
      }

      <Imagem source={Logo}/>

      <Pressionavel onPress={logout}>
        <Icon name='more-vertical' size={24} color={tema.color.ouro}/>
      </Pressionavel>
    </Envolvedor>
  )
}

export default Cabecalho