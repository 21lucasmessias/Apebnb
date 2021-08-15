import React from "react"

import { tema } from "../../global/estilos/tema"

import Icon from 'react-native-vector-icons/Feather'

import {
  Envolvedor,
  DiaEnvolvedor,
  Dia,
  IconEnvolvedor
} from './estilos'

interface iVisualizacaoDeData {
  dia: string
}

const VisualizacaoDeData: React.FC<iVisualizacaoDeData> = ({dia}) => {
  return(
    <Envolvedor>
      <DiaEnvolvedor>
        <Dia>
          {dia}
        </Dia>
      </DiaEnvolvedor>

      <IconEnvolvedor>
        <Icon name='calendar' size={24} color={tema.color.azulEscuro} />
      </IconEnvolvedor>
    </Envolvedor>
  )
}

export default VisualizacaoDeData