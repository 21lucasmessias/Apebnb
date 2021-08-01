import React, { useState, useEffect } from 'react'

import moment from 'moment'

import { StackScreenProps } from '@react-navigation/stack'
import { RotasReservasParamsList } from '../rotas'

import Icon from 'react-native-vector-icons/Feather'

import { tema } from '../../../global/estilos/tema'
import { iReserva } from '../../../models/Reserva'
import { iAmbiente } from '../../../models/Ambiente'

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

interface iReservaScreen extends StackScreenProps<RotasReservasParamsList, 'visualizarReserva'> {}

const VisualizarReserva: React.FC<iReservaScreen> = ({ route }) => {
  const { 
    idReserva
  } = route.params

  const [carregando, setCarregando] = useState(true)

  const [ambiente, setAmbiente] = useState<iAmbiente>()
  const [reserva, setReserva] = useState<iReserva>()

  const cancelarReserva = () => {
    console.log("Reserva cancelada")
  }

  useEffect(() => {
    setAmbiente({
      descricao: 'teste',
      foto: null,
      id: '1',
      nome: 'teste',
      diasDisponiveis: {
        domingo: true,
        quarta: true,
        quinta: true,
        sabado: true,
        segunda: true,
        sexta: true,
        terca: true,
      }
    })

    setReserva({
      data: moment(1),
      horario: '19:00-20:00',
      id: idReserva,
      idAmbiente: '1',
      idUsuario: '1'
    })

    setCarregando(false)
  }, [])

  return (
    <Conteiner>
      <Envolvedor showsVerticalScrollIndicator={false}>
        {!carregando ? (
          <>
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
              <VisualizacaoDeData dia={moment(1)}/>

              <Divisor/>

              <VisualizacaoDeHorario horarioEscolhido={reserva?.horario}/>
            </EnvolvedorData>
          </>
        ) : (
          <Titulo>Loading</Titulo>
        )}
      </Envolvedor>

      <EnvolvedorBotoes>
        <Botao tipo='preenchido' texto="Cancelar Reserva" aoPressionar={cancelarReserva}/>
      </EnvolvedorBotoes>
    </Conteiner>
  )
}

export default VisualizarReserva
