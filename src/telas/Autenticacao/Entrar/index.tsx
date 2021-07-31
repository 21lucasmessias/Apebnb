import React, { useState } from 'react'

import Icon from 'react-native-vector-icons/Feather'

import { StackScreenProps } from '@react-navigation/stack'
import { RotasAutenticacaoParamsList } from '../rotas'

import Botao from '../../../componentes/Botao'
import EntradaDeDados from '../../../componentes/EntradaDeDados'
import { HeaderAnimacoes } from './animacoes'

import { validadorString } from '../../../utils/Validadores'
import { tema } from '../../../global/estilos/tema'

import {
  Voltar,
  Conteiner,
  TextoConteiner,
  FormEnvolvedor,
  Descricao,
  EnvolvedorBotoes,
  EsqueceuSenha,
  TextoSenha
} from './estilos'

interface iEntrarScreen extends StackScreenProps<RotasAutenticacaoParamsList, 'entrar'> {}

const Entrar: React.FC<iEntrarScreen> = ({navigation}) => {
  const [nome, setNome] = useState('')

  return (
    <Conteiner>
      <HeaderAnimacoes />
      <TextoConteiner>
        <Descricao>
          Bem vinda(o), é bom ter{'\n'}você por aqui
        </Descricao>
      </TextoConteiner>

      <FormEnvolvedor contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
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

        <EsqueceuSenha onPress={() => {navigation.navigate('recuperarSenha')}}> 
          <TextoSenha>
            Esqueceu a senha?
          </TextoSenha>
        </EsqueceuSenha>
      </FormEnvolvedor>

      <EnvolvedorBotoes>
        <Botao
          texto='Entrar'
          aoPressionar={() => {}}
          tipo='preenchido'
        />
      </EnvolvedorBotoes>
      <Voltar onPress={() => navigation.goBack()}>
          <Icon name='arrow-left' size={24} color={tema.color.ouro}/>
      </Voltar>
    </Conteiner>
  )
}

export default Entrar