import React, { useEffect, useState, useContext } from 'react'
import { View } from 'react-native'

import { ContextoAutenticacao } from '../../contextos/ContextoAutenticacao'
import { ContextoReserva } from '../../contextos/ContextoReservas'

import { ActivityIndicator } from 'react-native-paper'
import moment from 'moment'
import { Agenda, AgendaItemsMap, LocaleConfig } from 'react-native-calendars'

import { StackScreenProps } from '@react-navigation/stack'
import { RotasReservasParamsList } from './rotas'

import { iReserva } from '../../models/Reserva'
import { configAgenda, traduzir } from '../../utils/Traduzir'
import { tema } from '../../global/estilos/tema'

import CartaoReserva from '../../componentes/CartaoReserva'

import {
  Container,
  Texto,
  TextoDia,
  DivisorDia,
  DiaConteiner
} from './estilos'
import { padNumero } from '../../utils/Utils'

const Reservas: React.FC<StackScreenProps<RotasReservasParamsList, 'reservas'>> = ({ navigation }) => {
  const { user } = useContext(ContextoAutenticacao)
  const { listarReservasUsuario, listarTodasReservas, adicionarListenerReservas } = useContext(ContextoReserva)

  const hoje = new Date()

  const [reservas, setReservas] = useState<AgendaItemsMap<iReserva>>()
  const [carregando, setCarregando] = useState(true)

  useEffect(() => {
    if(user.uid){
      const unsubscribeAutoRefresh = adicionarListenerReservas(refreshReservas)
  
      LocaleConfig.locales['br'] = configAgenda
      LocaleConfig.defaultLocale = 'br'
  
      return unsubscribeAutoRefresh
    }
  }, [])

  const refreshReservas = async () => {
    setCarregando(true)

    const reservas = user.isAdmin ? (
      await listarTodasReservas()
    ) : (
      await listarReservasUsuario(user.uid as string)
    )

    const reservasFormatadas: {[date: string] : Array<iReserva>} = {}

    reservas.forEach(async (reserva) => {
      let data = `${reserva.data.ano}-${padNumero(reserva.data.mes)}-${padNumero(reserva.data.dia)}`

      if(reservasFormatadas[data]){
        reservasFormatadas[data].push(reserva)
      } else {
        reservasFormatadas[data] = [reserva]
      }
    })

    setReservas(reservasFormatadas)
    setCarregando(false)
  }

  return (
    <Container>
      <Texto>Reservas</Texto>
      {
        carregando ? (
          <ActivityIndicator size='large' color={tema.color.azulEscuro}/>
        ) : (
          <Agenda
            items={reservas}
            selected={hoje}
            renderItem={(item) => (
              <CartaoReserva
                navigation={navigation}
                reserva={item}
              />
            )}
            renderDay={(date) => {
              if(date){
                return(
                  <DiaConteiner>
                    <DivisorDia/>
                    <TextoDia>{date?.day}{'\n'}{(traduzir[moment(date.dateString).format('ddd')])}</TextoDia>
                  </DiaConteiner>
                )
              }
    
              return (
                <View style={{width: 60}}></View>
              )
            }}
            renderEmptyDate={() => <></>}
            rowHasChanged={(r1, r2) => r1.id !== r2.id}
          />
        )
      }
    </Container>
  )
}

export default Reservas