import React, { useState } from "react"
import moment from "moment"

import { tema } from "../../global/estilos/tema"
import { height, width } from "../../utils/Utils"

import { validadorData } from "../../utils/Validadores"

import Icon from 'react-native-vector-icons/Feather'
import { Dialog } from "react-native-paper"
import CalendarPicker from 'react-native-calendar-picker'

import {
  Envolvedor,
  Entrada,
  Pressionavel
} from './estilos'

import Botao from "../Botao"

interface iEntradaDeData {
  setCalendarioVisivel: React.Dispatch<React.SetStateAction<boolean>>,
  diaString: string,
  setDiaString: React.Dispatch<React.SetStateAction<string>>,
}

const EntradaDeData: React.FC<iEntradaDeData> = ({setCalendarioVisivel, diaString, setDiaString}) => {

  const [focado, setFocado] = useState(false);
  const [erro, setErro] = useState(false);

  return(
    <Envolvedor>
      <Entrada
        value={diaString}
        onChangeText={setDiaString}

        onFocus={() => {
          setFocado(true)
        }}

        onEndEditing={() => {
          setFocado(false)
          setErro(!validadorData(diaString))
        }}

        focado={focado}
        erro={erro}

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
  setDiaString: React.Dispatch<React.SetStateAction<string>>,
}

export const DialogData: React.FC<iDialogData> = ({calendarioVisivel, setCalendarioVisivel, setDia, setDiaString}) => {
  const hoje = moment(new Date()).subtract(86400000)

  const diasDesabilitados = (date: moment.Moment) => {
    return date.diff(hoje) < 0
  }

  const aoMudarDiaPeloCalendario = (date: moment.Moment) => {
    setDia(date)
    setDiaString(date.format('DD/MM/YYYY'))
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