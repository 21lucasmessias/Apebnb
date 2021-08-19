import React, { useState, useRef, useContext } from 'react'

import { View, Keyboard } from 'react-native'

import { RouteProp } from '@react-navigation/native'
import { StackHeaderProps, StackScreenProps } from '@react-navigation/stack'
import { RotasAmbientesParamsList } from '../rotas'

import { ContextoAmbientes } from '../../../contextos/ContextoAmbientes'

import Icon from 'react-native-vector-icons/Feather'

import { iAmbiente } from '../../../models/Ambiente'
import { validadorTituloAmbiente, validadorDescricaoAmbiente } from '../../../utils/Validadores'
import { tema } from '../../../global/estilos/tema'

import EntradaDeDados from '../../../componentes/EntradaDeDados'
import EntradaDeDadosArea from '../../../componentes/EntradaDeDadosArea'
import SeletorDiasSemana from '../../../componentes/SeletorDiasSemana'
import Botao from '../../../componentes/Botao'

import Cabecalho from '../../../componentes/Cabecalho'

import {
  Conteiner,
  Envolvedor,
  Foto,
  FotoVaziaEnvolvedor,
  Divisor,
  EnvolvedorBotoes
} from './estilos'

interface iAmbienteScreen extends StackScreenProps<RotasAmbientesParamsList, 'administrarAmbiente'> {}

const AdministrarAmbiente: React.FC<iAmbienteScreen> = ({ route }) => {
  const { ambiente } = route.params

  const { atualizarAmbiente } = useContext(ContextoAmbientes)

  const [nome, setNome] = useState(ambiente.nome)
  const [descricao, setDescricao] = useState(ambiente.descricao)
  const [foto, setFoto] = useState(ambiente.foto ? ambiente.foto : '')
  const diasSemanaRef = useRef<View>(null)

  const salvarAmbiente = () => {
    Keyboard.dismiss()

    // @ts-ignore: Unreachable code error
    let diasSemana: Array<boolean> = diasSemanaRef.current._children.map((c) => {
      return c._internalFiberInstanceHandleDEV.child._debugOwner.memoizedProps.dia as boolean
    })

    let novoAmbiente: iAmbiente = {
      id: ambiente.id,
      descricao: descricao,
      nome: nome,
      foto: foto,
      diasDisponiveis: [
        diasSemana[0],
        diasSemana[1],
        diasSemana[2],
        diasSemana[3],
        diasSemana[4],
        diasSemana[5],
        diasSemana[6]
      ],
    }
    
    atualizarAmbiente(novoAmbiente)
  }

  return (
    <Conteiner>
      <Envolvedor showsVerticalScrollIndicator={false}>
        {foto ? (
          <Foto source={{ uri: foto }} />
        ) : (
          <FotoVaziaEnvolvedor>
            <Icon name='camera' size={24} color={tema.color.azulEscuro} />
          </FotoVaziaEnvolvedor>
        )}

        <Divisor />

        <EntradaDeDados
          nome='Título'
          validador={validadorTituloAmbiente}
          valor={nome}
          setValor={setNome}
        />

        <Divisor />

        <EntradaDeDadosArea
          nome='Descrição'
          validador={validadorDescricaoAmbiente}
          valor={descricao}
          setValor={setDescricao}
        />

        <Divisor />

        <SeletorDiasSemana ref={diasSemanaRef} diasDisponiveis={ambiente.diasDisponiveis}/>
      </Envolvedor>

      <EnvolvedorBotoes>
        <Botao tipo='preenchido' texto="Salvar" aoPressionar={salvarAmbiente}/>
      </EnvolvedorBotoes>
    </Conteiner>
  )
}


interface iCabecalhoAdministrarAmbiente {
  props: StackHeaderProps
}

export const CabecalhoAdministrarAmbiente: React.FC<iCabecalhoAdministrarAmbiente> = ({props}) => {
  const { removerAmbiente } = useContext(ContextoAmbientes)

  return (
    <Cabecalho
      stackCabecalhoProps={props}
      menusAdicionais={[
        {
          acao: () => {
            removerAmbiente((props.scene.route as RouteProp<RotasAmbientesParamsList, "administrarAmbiente">).params.ambiente)
            .then(() => {
              props.navigation.goBack()
            })
          },
          nome: 'trash-2',
          texto: 'Excluir'
        }
      ]}
  />
  )
}

export default AdministrarAmbiente
