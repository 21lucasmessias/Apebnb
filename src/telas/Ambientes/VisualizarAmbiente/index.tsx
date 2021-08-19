import React, { useContext, useEffect, useState } from 'react'
import moment from 'moment'

import { ActivityIndicator } from 'react-native-paper'

import { StackScreenProps } from '@react-navigation/stack'
import { RotasAmbientesParamsList } from '../rotas'

import { ContextoReserva } from '../../../contextos/ContextoReservas'
import { ContextoAutenticacao } from '../../../contextos/ContextoAutenticacao'
import { ContextoMorador } from '../../../contextos/ContextoMorador';

import Icon from 'react-native-vector-icons/Feather'

import { tema } from '../../../global/estilos/tema'
import { iHorario, iReserva } from '../../../models/Reserva'
import { iMorador } from '../../../models/Morador';
import { showToast } from '../../../utils/Animacoes';

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

const VisualizarAmbiente: React.FC<iAmbienteScreen> = ({ route, navigation }) => {
  const { criarReserva, listarHorariosDisponiveis,  } = useContext(ContextoReserva)
  const { getMorador } = useContext(ContextoMorador)
  const { user } = useContext(ContextoAutenticacao)

  const { ambiente } = route.params

  const hoje = moment(new Date())

  const [morador, setMorador] = useState<iMorador>()

  const [dia, setDia] = useState<moment.Moment>(hoje)
  const [data, setData] = useState<iReserva['data']>({
    ano: hoje.year(),
    dia: hoje.date(),
    mes: hoje.month()+1
  })
  const [calendarioVisivel, setCalendarioVisivel] = useState(false)
  
  const [horarioVisivel, setHorarioVisivel] = useState(false)
  const [horarioEscolhido, setHorarioEscolhido] = useState<iHorario>()
  const [horariosDisponiveis, setHorariosDisponiveis] = useState<iHorario[]>([])
  const [erroHorario, setErroHorario] = useState(false)

  const [carregando, setCarregando] = useState(false)

  useEffect(() => {
    if(user.uid){
      getMorador(user.uid!)
      .then((res) => {
        setMorador(res)
      })
      .catch((err) => {
        console.log(err)
        showToast('Erro ao sincronizar morador.')
        navigation.goBack()
      })

      listarHorariosDisponiveis(ambiente.id, data)
      .then(res => {
        setHorariosDisponiveis(res)
      }) 
    }
  }, [])

  const verificarDados = () => {
    if(horarioEscolhido === undefined){
      setErroHorario(true)
      showToast("Preencha os dados corretamente.")
      return false
    }
    return true
  }

  const realizarReserva = async () => {
    setCarregando(true)

    if(verificarDados()) {
      if(user.uid) {
        let reserva: iReserva = {
          id: '',
          ambiente: ambiente,
          morador: morador!,
          data: data,
          horario: horarioEscolhido!
        }
  
        const foiCriado = await criarReserva(reserva)
    
        if(foiCriado) {
          navigation.goBack()
        }
      }
    }

    setCarregando(false)
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
            data={data}
          />

          <Divisor/>

          <EntradaDeHorario
            setRelogioVisivel={setHorarioVisivel}
            horarioEscolhido={horarioEscolhido}
            erro={erroHorario}
            setErroHorario={setErroHorario}
          />
        </EnvolvedorData>
      </Envolvedor>

      {
        carregando && (
          <ActivityIndicator size='large' color={tema.color.azulEscuro} />
        )
      }

      <EnvolvedorBotoes>
        <Botao tipo='preenchido' texto="Realizar Reserva" aoPressionar={realizarReserva}/>
      </EnvolvedorBotoes>

      <DialogData
        calendarioVisivel={calendarioVisivel}
        setCalendarioVisivel={setCalendarioVisivel}
        setDia={setDia}
        setData={setData}
        diasDisponiveis={ambiente.diasDisponiveis}
      />

      <DialogHorario
        horarioVisivel={horarioVisivel}
        setHorarioVisivel={setHorarioVisivel}
        horarioEscolhido={horarioEscolhido}
        setHorarioEscolhido={setHorarioEscolhido}
        horariosDisponiveis={horariosDisponiveis}
      />
    </Conteiner>
  )
}

export default VisualizarAmbiente
