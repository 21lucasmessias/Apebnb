import React, { useState } from 'react'

import Icon from 'react-native-vector-icons/Feather'

import { StackScreenProps } from '@react-navigation/stack'
import { RotasAutenticacaoParamsList } from '../rotas'


import Botao from '../../../componentes/Botao'
import EntradaDeDados from '../../../componentes/EntradaDeDados'

import { validadorString } from '../../../utils/Validadores'

import {
  Voltar,
  Conteiner,
  TextoConteiner,
  FormEnvolvedor,
  Descricao,
  EnvolvedorBotoes,
} from './estilos'
import { tema } from '../../../global/estilos/tema'
import { HeaderAnimacoes } from './animacoes'

interface iCadastroScreen extends StackScreenProps<RotasAutenticacaoParamsList, 'cadastro'> {}

const Cadastro: React.FC<iCadastroScreen> = ({navigation}) => {
  const [nome, setNome] = useState('')

  return (
    <Conteiner>
      <HeaderAnimacoes />

      <TextoConteiner>
        <Descricao>
          Insira seus dados
        </Descricao>
      </TextoConteiner>

      <FormEnvolvedor contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
        <EntradaDeDados 
          nome='Nome completo'
          validador={validadorString}
          valor={nome}
          setValor={setNome}
        />

        <EntradaDeDados 
          nome='CPF'
          validador={validadorString}
          valor={nome}
          setValor={setNome}
        />

        <EntradaDeDados 
          nome='Email'
          validador={validadorString}
          valor={nome}
          setValor={setNome}
        />

        <EntradaDeDados 
          nome='Senha'
          validador={validadorString}
          valor={nome}
          setValor={setNome}
        />
      </FormEnvolvedor>

      <EnvolvedorBotoes>
        <Botao
          texto='Realizar Cadastro'
          aoPressionar={() => {navigation.navigate('entrar')}}
          tipo='preenchido'
        />
      </EnvolvedorBotoes>
      <Voltar onPress={() => navigation.goBack()}>
          <Icon name='arrow-left' size={24} color={tema.color.ouro}/>
      </Voltar>
    </Conteiner>
  )
}

export default Cadastro