import React, {useEffect, useState} from 'react'
import { View } from 'react-native'

import moment from 'moment'
import { Agenda, AgendaItemsMap, LocaleConfig } from 'react-native-calendars'

import { StackScreenProps } from '@react-navigation/stack'
import { RotasReservasParamsList } from './rotas'

import { iReserva } from '../../models/Reserva'
import { traduzir } from '../../utils/Traduzir'

import CartaoReserva from '../../componentes/CartaoReserva'

import {
  Container,
  Texto,
  TextoDia,
  DivisorDia,
  DiaConteiner
} from './estilos'


const Reservas: React.FC<StackScreenProps<RotasReservasParamsList, 'reservas'>> = ({ navigation }) => {
  const hoje = new Date()

  const [items, setItems] = useState<AgendaItemsMap<iReserva>>()

  useEffect(() => {
    LocaleConfig.locales['br'] = {
      monthNames: ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
      monthNamesShort: ['Jan.','Fev.','Mar.','Abr.','Mai.','Jun.','Jul.','Ago.','Set.','Out.','Nov.','Dec.'],
      dayNames: ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sabado'],
      dayNamesShort: ['Dom.','Seg.','Ter.','Qua.','Qui.','Sex.','Sab.'],
      today: 'Hoje'
    };

    LocaleConfig.defaultLocale = 'br'

    setItems({
      '2021-07-26': [
        {
          id: '1',
          idAmbiente: '1',
          idUsuario: 'safasfas',
          data: moment('2021-07-26'),
          horario: '19:00-20:00',
        },
        {
          id: '2',
          idAmbiente: '1',
          idUsuario: 'safasfas',
          data: moment('2021-07-26'),
          horario: '19:00-20:00',
        },
        {
          id: '3',
          idAmbiente: '1',
          idUsuario: 'safasfas',
          data: moment('2021-07-26'),
          horario: '19:00-20:00',
        }
      ],
      '2021-07-27': [
        {
          id: '4',
          idUsuario: 'safasfas',
          data: moment('2021-07-26'),
          horario: '19:00-20:00',
          idAmbiente: '2'
        },
        {
          id: '5',
          idUsuario: 'safasfas',
          data: moment('2021-07-26'),
          horario: '19:00-20:00',
          idAmbiente: '2'
        },
        {
          id: '6',
          idUsuario: 'safasfas',
          data: moment('2021-07-26'),
          horario: '19:00-20:00',
          idAmbiente: '2'
        }
      ],
      '2021-07-28': [
        {
          id: '7',
          idUsuario: 'safasfas',
          data: moment('2021-07-26'),
          horario: '19:00-20:00',
          idAmbiente: '2'
        },
        {
          id: '8',
          idUsuario: 'safasfas',
          data: moment('2021-07-26'),
          horario: '19:00-20:00',
          idAmbiente: '2'
        },
        {
          id: '9',
          idUsuario: 'safasfas',
          data: moment('2021-07-26'),
          horario: '19:00-20:00',
          idAmbiente: '2'
        }
      ],
    })
  }, [])

  return (
    <Container>
      <Texto>Reservas</Texto>
      <Agenda
        items={items}
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