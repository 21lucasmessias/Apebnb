import React, { useState, useEffect, useContext } from 'react'

import moment from 'moment'
import Icon from 'react-native-vector-icons/Feather'

import { StackScreenProps } from '@react-navigation/stack'
import { RotasReservasParamsList } from '../rotas'


import { ContextoReserva } from '../../../contextos/ContextoReservas'
import { ContextoAmbientes } from '../../../contextos/ContextoAmbientes'


import { tema } from '../../../global/estilos/tema'
import { iReserva } from '../../../models/Reserva'
import { iAmbiente } from '../../../models/Ambiente'
import { showToast } from '../../../utils/Animacoes'

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

const VisualizarReserva: React.FC<iReservaScreen> = ({ route }) => {
  const { reserva } = route.params

  const { cancelarReserva } = useContext(ContextoReserva)
  const { getAmbiente } = useContext(ContextoAmbientes)

  const [carregando, setCarregando] = useState(true)
  const [ambiente, setAmbiente] = useState<iAmbiente>()

  const cancelarReservaHandler = async () => {
    await cancelarReserva(reserva)
  }

  useEffect(() => {
    getAmbiente(reserva.idAmbiente)
    .then((res) => {
      if(res) {
        setAmbiente(res)
        setCarregando(false)
      } else {
        showToast("Erro ao carregar ambiente.")
      }
    })
  }, [])

  return (
    <Conteiner>
      {!carregando ? (
        <>
          <Envolvedor showsVerticalScrollIndicator={false}>
            {ambiente?.foto ? (
              <Foto source={{ uri: ambiente.foto }} />
            ) : (
              <FotoVaziaEnvolvedor>
                <Icon name='camera' size={24} color={tema.color.azulEscuro} />
              </FotoVaziaEnvolvedor>
            )}

            <Divisor />

            <Titulo>
              {ambiente?.nome}
            </Titulo>

            <Divisor />

            <Descricao>
              {ambiente?.descricao}
            </Descricao>

            <DivisorVisivel/>

            <EnvolvedorData>
              <VisualizacaoDeData dia={reserva.data}/>

              <Divisor/>

              <VisualizacaoDeHorario horarioEscolhido={reserva.horario}/>
            </EnvolvedorData>
          </Envolvedor>

          <EnvolvedorBotoes>
            <Botao tipo='preenchido' texto="Cancelar Reserva" aoPressionar={cancelarReservaHandler}/>
          </EnvolvedorBotoes>
        </>
      ) : (
        <ActivityIndicator size='large' color={tema.color.azulEscuro} />
      )}
    </Conteiner>
  )
}

export default VisualizarReserva
