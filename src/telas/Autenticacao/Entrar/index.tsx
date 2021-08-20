import React, {useState, useContext} from 'react';
import {Keyboard} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';

import {ContextoAutenticacao} from '../../../contextos/ContextoAutenticacao';

import {StackScreenProps} from '@react-navigation/stack';
import {RotasAutenticacaoParametrosLista} from '../rotas';

import Icon from 'react-native-vector-icons/Feather';

import {
  validadorDeEmail,
  validadorEntradaStringNumero,
} from '../../../utils/Validadores';
import {tema} from '../../../global/estilos/tema';

import Botao from '../../../componentes/Botao';
import EntradaDeDados from '../../../componentes/EntradaDeDados';

import {EntrarAnimacoes} from './animacoes';

import {
  Voltar,
  Conteiner,
  TextoConteiner,
  FormEnvolvedor,
  Descricao,
  EnvolvedorBotoes,
  EsqueceuSenha,
  TextoSenha,
  Preenchimento,
} from './estilos';

interface iEntrarScreen
  extends StackScreenProps<RotasAutenticacaoParametrosLista, 'entrar'> {}

const Entrar: React.FC<iEntrarScreen> = ({navigation}) => {
  const {autenticar} = useContext(ContextoAutenticacao);

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const [carregando, setCarregando] = useState(false);

  const entrar = async () => {
    Keyboard.dismiss();
    setCarregando(true);

    await autenticar(email, senha);

    setCarregando(false);
  };

  return (
    <Conteiner>
      <EntrarAnimacoes />
      <TextoConteiner>
        <Descricao>Bem vinda(o), é bom ter{'\n'}você por aqui</Descricao>
      </TextoConteiner>

      <FormEnvolvedor
        keyboardShouldPersistTaps="always"
        contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}>
        <EntradaDeDados
          nome="Email"
          validador={validadorDeEmail}
          valor={email}
          setValor={setEmail}
          tipoTeclado="email-address"
        />

        <EntradaDeDados
          nome="Senha"
          validador={validadorEntradaStringNumero}
          valor={senha}
          setValor={setSenha}
          tipoAutoCompletar="password"
        />

        <EsqueceuSenha>
          <Preenchimento />
          <TextoSenha
            onPress={() => {
              navigation.navigate('recuperarSenha');
            }}>
            Esqueceu a senha?
          </TextoSenha>
        </EsqueceuSenha>
      </FormEnvolvedor>

      <ActivityIndicator
        style={{position: 'absolute', bottom: 70, alignSelf: 'center'}}
        animating={carregando}
        size="large"
        color={tema.color.verdeAzulado}
      />

      <EnvolvedorBotoes>
        <Botao texto="Entrar" aoPressionar={entrar} tipo="preenchido" />
      </EnvolvedorBotoes>

      <Voltar onPress={() => navigation.goBack()}>
        <Icon name="arrow-left" size={24} color={tema.color.ouro} />
      </Voltar>
    </Conteiner>
  );
};

export default Entrar;
