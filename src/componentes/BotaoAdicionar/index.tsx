import React from 'react'
import { TouchableOpacityProps } from 'react-native'

import Icon from 'react-native-vector-icons/Feather'
import { tema } from '../../global/estilos/tema'

import {
  Envolvedor,
  Pressionavel
} from './estilos'

interface iBotaoAdicionar extends TouchableOpacityProps {
  tipo: 'claro' | 'escuro'
}


const BotaoAdicionar: React.FC<iBotaoAdicionar> = ({ tipo, ...rest }) => {
  return (
    <Pressionavel activeOpacity={0.7} {...rest}>
      <Envolvedor tipo={tipo}>
        <Icon name='plus' size={26} color={tipo == 'claro' ? tema.color.branco : tema.color.azulEscuro}/>
      </Envolvedor>
    </Pressionavel>
  )
}

export default BotaoAdicionar
