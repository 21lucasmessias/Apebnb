import React, {useEffect, useState} from 'react'
import { View } from 'react-native'

import moment from 'moment'

import { StackScreenProps } from '@react-navigation/stack'
import { RotasReservasParamsList } from './rotas'


import { iReserva } from '../../models/Reserva'
import { traduzir } from '../../utils/Traduzir'

import { Agenda } from 'react-native-calendars'
import CartaoReserva from '../../componentes/CartaoReserva'

import {
  Container,
  Texto,
  TextoDia,
  DivisorDia,
  DiaConteiner
} from './estilos'


export const Reservas: React.FC<StackScreenProps<RotasReservasParamsList, 'reservas'>> = ({ navigation }) => {
  const hoje = new Date() 

  const [items, setItems] = useState<{[key: string]: iReserva[]}>()

  useEffect(() => {
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
        renderDay={(date, item) => {
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
      />
    </Container>
  )
}
