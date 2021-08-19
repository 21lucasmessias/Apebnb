import React, { useState } from "react"
import moment from "moment"

import { tema } from "../../global/estilos/tema"
import { height, padNumero, width } from "../../utils/Utils"
import { iReserva } from "../../models/Reserva"

import Icon from 'react-native-vector-icons/Feather'
import { Dialog } from "react-native-paper"
import CalendarPicker from 'react-native-calendar-picker'

import Botao from "../Botao"

import {
  Envolvedor,
  Entrada,
  Pressionavel
} from './estilos'
import { iAmbiente } from "../../models/Ambiente"

interface iEntradaDeData {
  setCalendarioVisivel: React.Dispatch<React.SetStateAction<boolean>>,
  data: iReserva['data']
}

const EntradaDeData: React.FC<iEntradaDeData> = ({setCalendarioVisivel, data}) => {

  const [focado, setFocado] = useState(false);
  const [erro, setErro] = useState(false);

  return(
    <Envolvedor>
      <Entrada
        value={`${padNumero(data.dia)}/${padNumero(data.mes)}/${data.ano}`}

        focado={focado}
        erro={erro}
        editable={false}

        placeholder="DD/MM/YY"
      >
      </Entrada>

      <Pressionavel
        activeOpacity={1}
        onPress={() => setCalendarioVisivel(true)}
        onFocus={() => {
          setFocado(true)
        }}
        focado={focado}
        erro={erro}
      >
        <Icon name='calendar' size={24} color={tema.color.azulEscuro} />
      </Pressionavel>
    </Envolvedor>
  )
}


interface iDialogData {
  calendarioVisivel: boolean,
  setCalendarioVisivel: React.Dispatch<React.SetStateAction<boolean>>,
  setDia: React.Dispatch<React.SetStateAction<moment.Moment>>,
  setData: React.Dispatch<React.SetStateAction<iReserva['data']>>,
  diasDisponiveis: iAmbiente['diasDisponiveis']
}

export const DialogData: React.FC<iDialogData> = ({calendarioVisivel, setCalendarioVisivel, setDia, setData, diasDisponiveis}) => {
  const hoje = moment(new Date()).subtract({days: 1})

  const diasDesabilitados = (date: moment.Moment) => {
    return date.diff(hoje) < 0 || !diasDisponiveis[date.day()]
  }

  const aoMudarDiaPeloCalendario = (date: moment.Moment) => {
    setDia(date)
    setData({
      ano: date.year(),
      dia: date.date(),
      mes: date.month()+1
    })
  }
  
  return(
    <Dialog
      visible={calendarioVisivel}
      onDismiss={() => setCalendarioVisivel(false)}
      style={{height: height * 0.6, justifyContent: 'space-between'}}
    >
      <Dialog.Content>
        <CalendarPicker
          onDateChange={aoMudarDiaPeloCalendario}
          disabledDates={(date) => diasDesabilitados(date)}
          previousTitleStyle={{
            left: 24
          }}
          nextTitleStyle={{
            right: 24
          }}
          width={width * 0.9}
        />
      </Dialog.Content>
      <Dialog.Actions>
        <Botao
          texto='Confirmar'
          aoPressionar={() => setCalendarioVisivel(false)}
          tipo='preenchido'
        />
      </Dialog.Actions>
    </Dialog>
  )
}

export default EntradaDeData