import React, {useState, useEffect, useContext} from 'react';
import {Keyboard, ScrollView} from 'react-native';

import * as ImagePicker from 'react-native-image-picker';
import {ActivityIndicator} from 'react-native-paper';

import {ContextoMorador} from '../../../contextos/ContextoMorador';
import {ContextoAutenticacao} from '../../../contextos/ContextoAutenticacao';

import {StackScreenProps} from '@react-navigation/stack';
import {RotasMoradoresParametrosLista} from '../rotas';

import {tema} from '../../../global/estilos/tema';

import Icon from 'react-native-vector-icons/Feather';

import {
  validadorCPF,
  validadorDeEmail,
  validadorDeNumero,
  validadorEntradaStringNumero,
  validadorString,
} from '../../../utils/Validadores';
import {iMorador} from '../../../models/Morador';

import EntradaDeDados from '../../../componentes/EntradaDeDados';
import Botao from '../../../componentes/Botao';

import {
  Envolvedor,
  Foto,
  Divisor,
  BotaoEnvolvedor,
  CarregandoEnvolvedor,
  FotoEnvolvedor,
  FotoVaziaEnvolvedor,
} from './estilos';
import {ContextoTeclado} from '../../../contextos/ContextoTeclado';
import {mostrarAviso} from '../../../utils/Animacoes';

interface iMoradorScreen
  extends StackScreenProps<
    RotasMoradoresParametrosLista,
    'administrarMorador'
  > {}

const TelaPerfil: React.FC<iMoradorScreen> = () => {
  const {usuario} = useContext(ContextoAutenticacao);
  const {procurarMoradorPorId, alterarMorador} = useContext(ContextoMorador);
  const {tecladoVisivel} = useContext(ContextoTeclado);

  const [carregando, setCarregando] = useState(true);

  const [foto, setFoto] = useState('');
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCPF] = useState('');
  const [numero, setNumero] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  useEffect(() => {
    if (usuario.uid) {
      procurarMoradorPorId(usuario.uid as string).then(morador => {
        if (morador) {
          setNome(morador.nome);
          setEmail(morador.email);
          setCPF(morador.cpf);
          setNumero(morador.numero ? morador.numero : '');
          setFoto(morador.foto ? morador.foto : '');
        }

        setCarregando(false);
      });
    }
  }, []);

  const salvarMorador = async () => {
    Keyboard.dismiss();

    if (senha === confirmarSenha) {
      const morador: iMorador = {
        id: usuario.uid!,
        cpf,
        email,
        nome,
        foto,
        numero,
      };

      await alterarMorador(morador, senha === confirmarSenha ? senha : null);
    } else {
      mostrarAviso('Senhas incompatíveis');
    }
  };

  const carregarImagem = () => {
    ImagePicker.launchImageLibrary(
      {
        mediaType: 'photo',
        selectionLimit: 1,
        includeBase64: true,
      },
      image => {
        if (!image.didCancel) {
          setFoto('data:image/png;base64,' + image!.assets![0].base64!);
        }
      },
    );
  };

  return carregando ? (
    <CarregandoEnvolvedor>
      <ActivityIndicator color={tema.color.azulEscuro} size="large" />
    </CarregandoEnvolvedor>
  ) : (
    <Envolvedor>
      <ScrollView
        keyboardShouldPersistTaps="always"
        showsVerticalScrollIndicator={false}
        focusable
        keyboardDismissMode="interactive">
        {foto ? (
          <FotoEnvolvedor onPress={carregarImagem}>
            <Foto source={{uri: foto}}></Foto>
          </FotoEnvolvedor>
        ) : (
          <FotoVaziaEnvolvedor onPress={carregarImagem}>
            <Icon name="camera" size={24} color={tema.color.azulEscuro} />
          </FotoVaziaEnvolvedor>
        )}

        <Divisor />
        <EntradaDeDados
          nome="Nome completo"
          valor={nome}
          setValor={setNome}
          validador={validadorString}
        />

        <Divisor />

        <EntradaDeDados
          nome="Email"
          valor={email}
          setValor={setEmail}
          validador={validadorDeEmail}
          tipoTeclado="email-address"
        />

        <Divisor />

        <EntradaDeDados
          nome="CPF"
          valor={cpf}
          setValor={setCPF}
          validador={validadorCPF}
          tipoTeclado="numeric"
        />

        <Divisor />

        <EntradaDeDados
          nome="Celular"
          valor={numero}
          setValor={setNumero}
          validador={validadorDeNumero}
          tipoTeclado="numeric"
        />

        <Divisor />

        <EntradaDeDados
          nome="Senha"
          valor={senha}
          setValor={setSenha}
          validador={validadorEntradaStringNumero}
          tipoAutoCompletar="password"
        />

        <Divisor />

        <EntradaDeDados
          nome="Confirmar Senha"
          valor={confirmarSenha}
          setValor={setConfirmarSenha}
          validador={validadorEntradaStringNumero}
          tipoAutoCompletar="password"
        />
        <Divisor />
        <BotaoEnvolvedor tecladoVisivel={tecladoVisivel}>
          <Botao
            tipo="preenchido"
            texto="Salvar"
            aoPressionar={salvarMorador}
          />
        </BotaoEnvolvedor>
      </ScrollView>
    </Envolvedor>
  );
};

export default TelaPerfil;
