import React from "react"

import { FlatList } from "react-native"

import { Dialog } from "react-native-paper"
import Icon from 'react-native-vector-icons/Feather'

import { tema } from "../../global/estilos/tema"
import { iHorario } from "../../models/Reserva"
import { height } from "../../utils/Utils"

import Botao from "../Botao"

import {
  Envolvedor,
  Entrada,
  Pressionavel,
  PressionavelHorario,
  Texto
} from './estilos'

interface iEntradaDeHorario {
  setRelogioVisivel: React.Dispatch<React.SetStateAction<boolean>>,
  horarioEscolhido: iHorario | undefined,
  erro: boolean,
  setErroHorario: React.Dispatch<React.SetStateAction<boolean>>,
}

const EntradaDeHorario: React.FC<iEntradaDeHorario> = ({setRelogioVisivel, horarioEscolhido, erro, setErroHorario}) => {
  return(
    <Envolvedor>
      <Entrada
        value={horarioEscolhido ? iHorario[horarioEscolhido] : ''}
        editable={false}
        placeholder="Horário"
        erro={erro}
      >
      </Entrada>

      <Pressionavel
        activeOpacity={1}
        onPress={() => {
          setRelogioVisivel(true)
          setErroHorario(false)
        }}
        erro={erro}
      >
        <Icon name='clock' size={24} color={tema.color.azulEscuro} />
      </Pressionavel>
    </Envolvedor>
  )
}

interface iDialogHorario {
  horarioVisivel: boolean,
  setHorarioVisivel: React.Dispatch<React.SetStateAction<boolean>>,
  horarioEscolhido: iHorario | undefined,
  setHorarioEscolhido: React.Dispatch<React.SetStateAction<iHorario | undefined>>,
  horariosDisponiveis: iHorario[],
}

export const DialogHorario: React.FC<iDialogHorario> = ({
  horarioVisivel,
  setHorarioVisivel,
  setHorarioEscolhido,
  horariosDisponiveis,
}) => {
  return(
    <Dialog
      visible={horarioVisivel}
      onDismiss={() => setHorarioVisivel(false)}
      style={{
        backgroundColor: tema.color.cinza,
        height: height * 0.65
      }}
    >
      <Dialog.Title style={{textAlign: 'center'}}>
        Selecione um horário
      </Dialog.Title>
      <Dialog.ScrollArea>
        <FlatList
          data={horariosDisponiveis}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({item}) => (
            <PressionavelHorario
              onPress={() => {
                setHorarioEscolhido(item)
                setHorarioVisivel(false)
              }}
            >
              <Texto>
                {iHorario[item]}
              </Texto>
            </PressionavelHorario>
          )}
        />
      </Dialog.ScrollArea>
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