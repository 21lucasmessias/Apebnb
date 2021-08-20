import React, {useState, useContext} from 'react';
import {Keyboard} from 'react-native';

import {ActivityIndicator} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Feather';

import {StackScreenProps} from '@react-navigation/stack';
import {RotasAutenticacaoParametrosLista} from '../rotas';

import {ContextoAutenticacao} from '../../../contextos/ContextoAutenticacao';

import {tema} from '../../../global/estilos/tema';
import {
  validadorCPF,
  validadorDeEmail,
  validadorEntradaStringNumero,
  validadorString,
} from '../../../utils/Validadores';
import {height} from '../../../utils/Utils';
import {mostrarAviso} from '../../../utils/Animacoes';
import {CadastroAnimacoes} from './animacoes';

import Botao from '../../../componentes/Botao';
import EntradaDeDados from '../../../componentes/EntradaDeDados';

import {
  Voltar,
  Conteiner,
  TextoConteiner,
  FormEnvolvedor,
  Descricao,
  EnvolvedorBotoes,
} from './estilos';

interface iCadastroScreen
  extends StackScreenProps<RotasAutenticacaoParametrosLista, 'cadastro'> {}

const Cadastro: React.FC<iCadastroScreen> = ({navigation}) => {
  const {criarConta} = useContext(ContextoAutenticacao);

  const [carregando, setCarregando] = useState(false);

  const [nome, setNome] = useState('');
  const [cpf, setCPF] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const verificarEntradas = () => {
    if (
      validadorString(nome) &&
      validadorCPF(cpf) &&
      validadorDeEmail(email) &&
      validadorEntradaStringNumero(senha)
    ) {
      return true;
    }

    mostrarAviso('Credencias inválidas.');

    return false;
  };

  const realizarCadastro = async () => {
    setCarregando(true);

    Keyboard.dismiss();
    if (verificarEntradas()) {
      await criarConta(nome, cpf, email, senha);
    }

    setCarregando(false);
  };

  return (
    <Conteiner>
      <CadastroAnimacoes />

      <TextoConteiner>
        <Descricao>Insira seus dados</Descricao>
      </TextoConteiner>

      <FormEnvolvedor
        keyboardShouldPersistTaps="always"
        contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}>
        <EntradaDeDados
          nome="Nome completo"
          validador={validadorString}
          valor={nome}
          setValor={setNome}
        />

        <EntradaDeDados
          nome="CPF"
          validador={validadorCPF}
          valor={cpf}
          setValor={setCPF}
        />

        <EntradaDeDados
          nome="Email"
          validador={validadorDeEmail}
          valor={email}
          setValor={setEmail}
        />

        <EntradaDeDados
          nome="Senha"
          valor={senha}
          setValor={setSenha}
          validador={validadorEntradaStringNumero}
          tipoAutoCompletar="password"
        />
      </FormEnvolvedor>

      <ActivityIndicator
        style={{position: 'absolute', top: height / 4 - 12, left: 34}}
        animating={carregando}
        size="large"
        color={tema.color.verdeAzulado}
      />

      <EnvolvedorBotoes>
        <Botao
          texto="Realizar Cadastro"
          aoPressionar={realizarCadastro}
          tipo="preenchido"
        />
      </EnvolvedorBotoes>
      <Voltar onPress={() => navigation.goBack()}>
        <Icon name="arrow-left" size={24} color={tema.color.ouro} />
      </Voltar>
    </Conteiner>
  );
};

export default Cadastro;
