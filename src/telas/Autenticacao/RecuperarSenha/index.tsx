import React, { useState } from 'react'

import Icon from 'react-native-vector-icons/Feather'

import { StackScreenProps } from '@react-navigation/stack'
import { RotasAutenticacaoParamsList } from '../rotas'

import Botao from '../../../componentes/Botao'
import EntradaDeDados from '../../../componentes/EntradaDeDados'
import { HeaderAnimacoes } from './animacoes'

import { validadorDeEmail, validadorString } from '../../../utils/Validadores'
import { tema } from '../../../global/estilos/tema'

import {
  Voltar,
  Conteiner,
  TextoConteiner,
  FormEnvolvedor,
  Descricao,
  EnvolvedorBotoes,
} from './estilos'
import { Dialog } from 'react-native-paper'
import { Keyboard } from 'react-native'
import { useContext } from 'react'
import { ContextoAutenticacao } from '../../../contextos/ContextoAutenticacao'

interface iRecuperarSenhaScreen extends StackScreenProps<RotasAutenticacaoParamsList, 'recuperarSenha'> {}

const RecuperarSenha: React.FC<iRecuperarSenhaScreen> = ({navigation}) => {
  const { recuperarSenha } = useContext(ContextoAutenticacao)
  const [email, setEmail] = useState('')
  const [dialogoVisivel, setDialogoVisivel] = useState(false)

  return (
    <Conteiner>
      <HeaderAnimacoes />
      <TextoConteiner>
        <Descricao>
          Insira seu e-mail para{'\n'}recuperar a senha
        </Descricao>
      </TextoConteiner>

      <FormEnvolvedor>
        <EntradaDeDados 
          nome='Email'
          validador={validadorString}
          valor={email}
          setValor={setEmail}
        />
      </FormEnvolvedor>

      <EnvolvedorBotoes>
        <Botao
          texto='Enviar'
          aoPressionar={() => {
            Keyboard.dismiss()
            if(validadorDeEmail(email)){
              recuperarSenha(email)
              setDialogoVisivel(true)
            }
          }}
          tipo='preenchido'
        />
      </EnvolvedorBotoes>
      <Voltar onPress={() => navigation.goBack()}>
          <Icon name='arrow-left' size={24} color={tema.color.ouro}/>
      </Voltar>

      <Dialog
        visible={dialogoVisivel}
        onDismiss={() => {
          setDialogoVisivel(false)
          navigation.goBack()
        }}
      >
        <Dialog.Title>Recuperar Senha</Dialog.Title>
        <Dialog.Content>
          <Descricao>
            Senha enviada para o email {`\n${email}\n`}
          </Descricao>
        </Dialog.Content>
      </Dialog>
    </Conteiner>
  )
}

export default RecuperarSenha