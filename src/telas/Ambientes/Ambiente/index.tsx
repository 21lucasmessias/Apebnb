import React, { useState } from 'react'

import { StackScreenProps } from '@react-navigation/stack'
import { RotasAmbientesParamsList } from '../rotas'

import { tema } from '../../../global/estilos/tema'

import Icon from 'react-native-vector-icons/Feather'

import EntradaDeDados from '../../../componentes/EntradaDeDados'
import EntradaDeDadosArea from '../../../componentes/EntradaDeDadosArea'
import SeletorDiasSemana from '../../../componentes/SeletorDiasSemana'
import Botao from '../../../componentes/Botao'

import { validadorTituloAmbiente, validadorDescricaoAmbiente } from '../../../utils/Validadores'

import {
  Conteiner,
  Envolvedor,
  Foto,
  FotoVaziaEnvolvedor,
  Divisor,
  EnvolvedorBotoes
} from './estilos'
import { useRef } from 'react'
import { View } from 'react-native'
import { iAmbiente } from '../../../models/Ambiente'

interface iAmbienteScreen extends StackScreenProps<RotasAmbientesParamsList, 'ambiente'> {}

const Ambiente: React.FC<iAmbienteScreen> = ({ route }) => {
  const { ambiente } = route.params
  const [titulo, setTitulo] = useState('')
  const [descricao, setDescricao] = useState('')
  const diasSemanaRef = useRef<View>(null)

  const salvarAmbiente = () => {
    // @ts-ignore: Unreachable code error
    let diasSemana: Array<boolean> = diasSemanaRef.current._children.map((c) => {
      return c._internalFiberInstanceHandleDEV.child._debugOwner.memoizedProps.dia as boolean
    })

    let ambiente: iAmbiente = {
      descricao: descricao,
      nome: titulo,
      diasDisponiveis: {
        segunda: diasSemana[0],
        terca: diasSemana[1],
        quarta: diasSemana[2],
        quinta: diasSemana[3],
        sexta: diasSemana[4],
        sabado: diasSemana[5],
        domingo: diasSemana[6]
      },
      foto: null
    }
    
    console.log(ambiente)
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

        <EntradaDeDados
          nome='Título'
          validador={validadorTituloAmbiente}
          valor={titulo}
          setValor={setTitulo}
        />

        <Divisor />

        <EntradaDeDadosArea
          nome='Descrição'
          validador={validadorDescricaoAmbiente}
          valor={descricao}
          setValor={setDescricao}
        />

        <Divisor />

        <SeletorDiasSemana ref={diasSemanaRef} />
      </Envolvedor>

      <EnvolvedorBotoes>
        <Botao tipo='preenchido' texto="Salvar" aoPressionar={salvarAmbiente}/>
      </EnvolvedorBotoes>
    </Conteiner>
  )
}

export default Ambiente
