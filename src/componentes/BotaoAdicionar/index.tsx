import React from 'react'
import { ViewProps } from 'react-native'

import Icon from 'react-native-vector-icons/Feather'
import { tema } from '../../global/estilos/tema'

import {
  Envolvedor,
  Pressionavel
} from './estilos'

interface iBotaoAdicionar extends ViewProps {
  tipo: 'claro' | 'escuro'
}


const BotaoAdicionar: React.FC<iBotaoAdicionar> = ({ tipo }) => {
  return (
    <Pressionavel activeOpacity={0.7}>
      <Envolvedor tipo={tipo}>
        <Icon name='plus' size={26} color={tipo == 'claro' ? tema.color.branco : tema.color.azulEscuro}/>
      </Envolvedor>
    </Pressionavel>
  )
}

export default BotaoAdicionar
