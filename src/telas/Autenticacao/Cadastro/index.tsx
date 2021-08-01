import React, { useState } from 'react'

import { StackScreenProps } from '@react-navigation/stack'
import { RotasAutenticacaoParamsList } from '../rotas'

import Icon from 'react-native-vector-icons/Feather'

import { tema } from '../../../global/estilos/tema'
import { validadorEntradaStringNumero, validadorString } from '../../../utils/Validadores'

import Botao from '../../../componentes/Botao'
import EntradaDeDados from '../../../componentes/EntradaDeDados'

import { HeaderAnimacoes } from './animacoes'

import {
  Voltar,
  Conteiner,
  TextoConteiner,
  FormEnvolvedor,
  Descricao,
  EnvolvedorBotoes,
} from './estilos'

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

      <FormEnvolvedor keyboardShouldPersistTaps='always' contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
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
          valor={nome}
          setValor={setNome}
          validador={validadorEntradaStringNumero}
          tipoAutoCompletar='password'
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