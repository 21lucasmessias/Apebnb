import React, {useState, useContext} from 'react';
import {Keyboard} from 'react-native';

import {Dialog} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Feather';

import {ContextoAutenticacao} from '../../../contextos/ContextoAutenticacao';

import {StackScreenProps} from '@react-navigation/stack';
import {RotasAutenticacaoParametrosLista} from '../rotas';

import Botao from '../../../componentes/Botao';
import EntradaDeDados from '../../../componentes/EntradaDeDados';
import {HeaderAnimacoes} from './animacoes';

import {validadorDeEmail, validadorString} from '../../../utils/Validadores';
import {tema} from '../../../global/estilos/tema';

import {
  Voltar,
  Envolvedor,
  TextoEnvolvedor,
  FormEnvolvedor,
  Descricao,
  EnvolvedorBotoes,
} from './estilos';

interface iRecuperarSenhaScreen
  extends StackScreenProps<
    RotasAutenticacaoParametrosLista,
    'recuperarSenha'
  > {}

const RecuperarSenha: React.FC<iRecuperarSenhaScreen> = ({navigation}) => {
  const {recuperarSenha} = useContext(ContextoAutenticacao);
  const [email, setEmail] = useState('');
  const [dialogoVisivel, setDialogoVisivel] = useState(false);

  const recuperarSenhaPressionado = () => {
    Keyboard.dismiss();
    if (validadorDeEmail(email)) {
      recuperarSenha(email);
      setDialogoVisivel(true);
    }
  };

  return (
    <Envolvedor>
      <HeaderAnimacoes />
      <TextoEnvolvedor>
        <Descricao>Insira seu e-mail para{'\n'}recuperar a senha</Descricao>
      </TextoEnvolvedor>

      <FormEnvolvedor>
        <EntradaDeDados
          nome="Email"
          validador={validadorString}
          valor={email}
          setValor={setEmail}
        />
      </FormEnvolvedor>

      <EnvolvedorBotoes>
        <Botao
          texto="Enviar"
          aoPressionar={recuperarSenhaPressionado}
          tipo="preenchido"
        />
      </EnvolvedorBotoes>
      <Voltar onPress={() => navigation.goBack()}>
        <Icon name="arrow-left" size={24} color={tema.color.ouro} />
      </Voltar>

      <Dialog
        visible={dialogoVisivel}
        onDismiss={() => {
          setDialogoVisivel(false);
          navigation.goBack();
        }}>
        <Dialog.Title>Recuperar Senha</Dialog.Title>
        <Dialog.Content>
          <Descricao>Senha enviada para o email {`\n${email}\n`}</Descricao>
        </Dialog.Content>
      </Dialog>
    </Envolvedor>
  );
};

export default RecuperarSenha;
