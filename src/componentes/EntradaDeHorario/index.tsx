import React from "react"

import { Dialog } from "react-native-paper"
import Icon from 'react-native-vector-icons/Feather'

import { tema } from "../../global/estilos/tema"

import ListaHorarios from "../ListaHorarios"
import Botao from "../Botao"

import {
  Envolvedor,
  Entrada,
  Pressionavel
} from './estilos'

interface iEntradaDeHorario {
  setRelogioVisivel: React.Dispatch<React.SetStateAction<boolean>>,
  horarioEscolhido: string,
}

const EntradaDeHorario: React.FC<iEntradaDeHorario> = ({setRelogioVisivel, horarioEscolhido}) => {
  return(
    <Envolvedor>
      <Entrada
        value={horarioEscolhido}
        editable={false}
        placeholder="Horário"
      >
      </Entrada>

      <Pressionavel
        activeOpacity={1}
        onPress={() => setRelogioVisivel(true)}
      >
        <Icon name='clock' size={24} color={tema.color.azulEscuro} />
      </Pressionavel>
    </Envolvedor>
  )
}

interface iDialogHorario {
  horarioVisivel: boolean,
  setHorarioVisivel: React.Dispatch<React.SetStateAction<boolean>>,
  horarioEscolhido: string,
  setHorarioEscolhido: React.Dispatch<React.SetStateAction<string>>,
}

export const DialogHorario: React.FC<iDialogHorario> = ({
  horarioVisivel,
  setHorarioVisivel,
  setHorarioEscolhido,
}) => {
  return(
    <Dialog
      visible={horarioVisivel}
      onDismiss={() => setHorarioVisivel(false)}
      style={{
        backgroundColor: tema.color.cinza
      }}
    >
      <Dialog.Content>
        <ListaHorarios
          setHorarioEscolhido={setHorarioEscolhido}
          setHorarioVisivel={setHorarioVisivel}
        />
      </Dialog.Content>
      <Dialog.Actions>
        <Botao
          texto='Cancelar'
          aoPressionar={() => setHorarioVisivel(false)}
          tipo='preenchido'
        />
      </Dialog.Actions>
    </Dialog>
  )
}

export default EntradaDeHorario