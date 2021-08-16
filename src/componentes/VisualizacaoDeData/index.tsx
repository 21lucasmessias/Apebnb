import React from "react"

import { tema } from "../../global/estilos/tema"

import Icon from 'react-native-vector-icons/Feather'

import { iReserva } from "../../models/Reserva"
import { padNumero } from "../../utils/Utils"

import {
  Envolvedor,
  DiaEnvolvedor,
  Dia,
  IconEnvolvedor
} from './estilos'

interface iVisualizacaoDeData {
  data: iReserva['data']
}

const VisualizacaoDeData: React.FC<iVisualizacaoDeData> = ({data}) => {
  return(
    <Envolvedor>
      <DiaEnvolvedor>
        <Dia>
          {`${padNumero(data.dia)}/${padNumero(data.mes)}/${data.ano}`}
        </Dia>
      </DiaEnvolvedor>

      <IconEnvolvedor>
        <Icon name='calendar' size={24} color={tema.color.azulEscuro} />
      </IconEnvolvedor>
    </Envolvedor>
  )
}

export default VisualizacaoDeData