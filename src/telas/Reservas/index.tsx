import React, { useEffect, useState, useContext } from 'react'
import { View } from 'react-native'

import { ContextoAutenticacao } from '../../contextos/ContextoAutenticacao'
import { ContextoReserva } from '../../contextos/ContextoReservas'

import moment from 'moment'
import { Agenda, AgendaItemsMap, LocaleConfig } from 'react-native-calendars'

import { StackScreenProps } from '@react-navigation/stack'
import { RotasReservasParamsList } from './rotas'

import { iReserva } from '../../models/Reserva'
import { configAgenda, traduzir } from '../../utils/Traduzir'

import CartaoReserva from '../../componentes/CartaoReserva'

import {
  Container,
  Texto,
  TextoDia,
  DivisorDia,
  DiaConteiner
} from './estilos'

const Reservas: React.FC<StackScreenProps<RotasReservasParamsList, 'reservas'>> = ({ navigation }) => {
  const { user } = useContext(ContextoAutenticacao)
  const { listarReservasUsuario, listarTodasReservas, adicionarListenerReservas } = useContext(ContextoReserva)

  const hoje = new Date()

  const [reservas, setReservas] = useState<AgendaItemsMap<iReserva>>()

  useEffect(() => {
    
    const unsubscribeAutoRefresh = adicionarListenerReservas(refreshReservas)

    refreshReservas()

    LocaleConfig.locales['br'] = configAgenda
    LocaleConfig.defaultLocale = 'br'

    return unsubscribeAutoRefresh
  }, [])

  const refreshReservas = async () => {
    const reservas = user.isAdmin ? (
      await listarTodasReservas()
    ) : (
      await listarReservasUsuario(user.uid as string)
    )

    console.log(reservas)
  }

  return (
    <Container>
      <Texto>Reservas</Texto>
      <Agenda
        items={reservas}
        selected={hoje}
        renderItem={(item) => 
          <CartaoReserva
            navigation={navigation}
            reserva={item}
          />
        }
        renderDay={(date) => {
          if(date){
            return(
              <DiaConteiner>
                <DivisorDia></DivisorDia>
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
    </Container>
  )
}

export default Reservas