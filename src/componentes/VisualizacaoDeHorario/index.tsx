import React from "react"

import Icon from 'react-native-vector-icons/Feather'

import {
  Envolvedor,
  Horario,
  HorarioEnvolvedor,
  IconEnvolvedor
} from './estilos'
import { tema } from "../../global/estilos/tema"

interface iVisualizacaoDeHorario {
  horarioEscolhido: string | undefined, 
}

const VisualizacaoDeHorario: React.FC<iVisualizacaoDeHorario> = ({ horarioEscolhido }) => {
  return(
    <Envolvedor>
      <HorarioEnvolvedor>
        <Horario>
          {horarioEscolhido}
        </Horario>
      </HorarioEnvolvedor>

      <IconEnvolvedor>
        <Icon name='clock' size={24} color={tema.color.azulEscuro} />
      </IconEnvolvedor>
    </Envolvedor>
  )
}

export default VisualizacaoDeHorario