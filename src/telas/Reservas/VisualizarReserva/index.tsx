import React, { useContext, useState } from 'react'

import moment from 'moment'
import Icon from 'react-native-vector-icons/Feather'

import { StackScreenProps } from '@react-navigation/stack'
import { RotasReservasParamsList } from '../rotas'

import { ContextoReserva } from '../../../contextos/ContextoReservas'

import { tema } from '../../../global/estilos/tema'
import { iHorario } from '../../../models/Reserva'

import Botao from '../../../componentes/Botao'
import VisualizacaoDeData from '../../../componentes/VisualizacaoDeData'
import VisualizacaoDeHorario from '../../../componentes/VisualizacaoDeHorario'

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
import { ActivityIndicator } from 'react-native-paper'

interface iReservaScreen extends StackScreenProps<RotasReservasParamsList, 'visualizarReserva'> {}

const VisualizarReserva: React.FC<iReservaScreen> = ({ route, navigation }) => {
  const { reserva } = route.params

  const [carregando, setCarregando] = useState(false)

  const { cancelarReserva } = useContext(ContextoReserva)

  const cancelarReservaHandler = async () => {
    setCarregando(true)
    if(await cancelarReserva(reserva)){
      navigation.goBack()
    }
    setCarregando(false)
  }

  return (
    <Conteiner>
      <Envolvedor showsVerticalScrollIndicator={false}>
        {reserva.ambiente.foto ? (
          <Foto source={{ uri: reserva.ambiente.foto }} />
        ) : (
          <FotoVaziaEnvolvedor>
            <Icon name='camera' size={24} color={tema.color.azulEscuro} />
          </FotoVaziaEnvolvedor>
        )}

        <Divisor />

        <Titulo>
          {reserva.ambiente.nome}
        </Titulo>

        <Divisor />

        <Descricao>
          {reserva.ambiente.descricao}
        </Descricao>

        <DivisorVisivel/>

        <EnvolvedorData>
          <VisualizacaoDeData data={reserva.data}/>

          <Divisor/>

          <VisualizacaoDeHorario horarioEscolhido={iHorario[reserva.horario]}/>
        </EnvolvedorData>
      </Envolvedor>

      {carregando && (
        <ActivityIndicator size='large' color={tema.color.azulEscuro} />
      )}

      <EnvolvedorBotoes>
        <Botao tipo='preenchido' texto="Cancelar Reserva" aoPressionar={cancelarReservaHandler}/>
      </EnvolvedorBotoes>
        
    </Conteiner>
  )
}

export default VisualizarReserva
