import React, { useState } from 'react'
import moment from 'moment'

import { StackScreenProps } from '@react-navigation/stack'
import { RotasAmbientesParamsList } from '../rotas'

import Icon from 'react-native-vector-icons/Feather'

import { tema } from '../../../global/estilos/tema'

import Botao from '../../../componentes/Botao'
import EntradaDeData, { DialogData } from '../../../componentes/EntradaDeData'
import EntradaDeHorario, { DialogHorario } from '../../../componentes/EntradaDeHorario'

import {
  Conteiner,
  Envolvedor,
  Foto,
  FotoVaziaEnvolvedor,
  Divisor,
  EnvolvedorBotoes,
  Titulo,
  Descricao,
  DivisorVisivel,
  EnvolvedorData
} from './estilos'

interface iAmbienteScreen extends StackScreenProps<RotasAmbientesParamsList, 'visualizarAmbiente'> {}

const VisualizarAmbiente: React.FC<iAmbienteScreen> = ({ route }) => {
  const hoje = moment(new Date()).subtract(86400000)
  const { ambiente } = route.params

  const [dia, setDia] = useState<moment.Moment>(hoje)
  const [diaString, setDiaString] = useState(hoje.format('DD/MM/YYYY'))
  const [calendarioVisivel, setCalendarioVisivel] = useState(false)
  
  const [horarioVisivel, setHorarioVisivel] = useState(false)

  const [horarioEscolhido, setHorarioEscolhido] = useState('')

  const realizarReserva = () => {
    console.log(dia, horarioEscolhido)
  }

  return (
    <Conteiner>
      <Envolvedor showsVerticalScrollIndicator={false}>
        {ambiente.foto ? (
          <Foto source={{ uri: ambiente.foto }} />
        ) : (
          <FotoVaziaEnvolvedor>
            <Icon name='camera' size={24} color={tema.color.azulEscuro} />
          </FotoVaziaEnvolvedor>
        )}

        <Divisor />

        <Titulo>
          {ambiente.nome}
        </Titulo>

        <Divisor />

        <Descricao>
          {ambiente.descricao}
        </Descricao>

        <DivisorVisivel/>

        <EnvolvedorData>
          <EntradaDeData
            setCalendarioVisivel={setCalendarioVisivel}
            diaString={diaString}
            setDiaString={setDiaString}
          />

          <Divisor/>

          <EntradaDeHorario
            setRelogioVisivel={setHorarioVisivel}
            horarioEscolhido={horarioEscolhido}
          />
        </EnvolvedorData>
      </Envolvedor>

      <EnvolvedorBotoes>
        <Botao tipo='preenchido' texto="Realizar Reserva" aoPressionar={realizarReserva}/>
      </EnvolvedorBotoes>

      <DialogData
        calendarioVisivel={calendarioVisivel}
        setCalendarioVisivel={setCalendarioVisivel}
        setDia={setDia}
        setDiaString={setDiaString}
      />

      <DialogHorario
        horarioVisivel={horarioVisivel}
        setHorarioVisivel={setHorarioVisivel}
        horarioEscolhido={horarioEscolhido}
        setHorarioEscolhido={setHorarioEscolhido}
      />
    </Conteiner>
  )
}

export default VisualizarAmbiente
