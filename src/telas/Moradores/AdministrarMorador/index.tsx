import React, {useState, useContext} from 'react';
import {ScrollView, Keyboard} from 'react-native';

import {ContextoMorador} from '../../../contextos/ContextoMorador';

import Icon from 'react-native-vector-icons/Feather';
import * as ImagePicker from 'react-native-image-picker';

import {StackHeaderProps, StackScreenProps} from '@react-navigation/stack';
import {RotasMoradoresParametrosLista} from '../rotas';
import {RouteProp} from '@react-navigation/native';

import {
  validadorCPF,
  validadorDeEmail,
  validadorDeNumero,
  validadorEntradaStringNumero,
} from '../../../utils/Validadores';
import {gerarAlerta} from '../../../utils/Utils';
import {tema} from '../../../global/estilos/tema';

import EntradaDeDados from '../../../componentes/EntradaDeDados';
import Botao from '../../../componentes/Botao';
import Cabecalho from '../../../componentes/Cabecalho';

import {
  Envolvedor,
  Foto,
  Divisor,
  BotaoEnvolvedor,
  FotoEnvolvedor,
  FotoVaziaEnvolvedor,
} from './estilos';

interface iMoradorScreen
  extends StackScreenProps<
    RotasMoradoresParametrosLista,
    'administrarMorador'
  > {}

const AdministrarMorador: React.FC<iMoradorScreen> = ({route}) => {
  const {morador} = route.params;
  const {alterarMorador} = useContext(ContextoMorador);

  const [foto, setFoto] = useState<string>(morador.foto ? morador.foto : '');
  const [nome, setNome] = useState<string>(morador.nome);
  const [email, setEmail] = useState<string>(morador.email);
  const [cpf, setCPF] = useState<string>(morador.cpf);
  const [numero, setNumero] = useState<string>(
    morador.numero ? morador.numero : '',
  );
  const [senha, setSenha] = useState<string>('');
  const [confirmarSenha, setConfirmarSenha] = useState<string>('');

  const salvarMorador = async () => {
    Keyboard.dismiss();

    await alterarMorador(
      {
        id: morador.id,
        cpf,
        email,
        nome,
        foto,
        numero,
      },
      senha === confirmarSenha ? senha : null,
    );
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

  return (
    <Envolvedor>
      <ScrollView
        keyboardShouldPersistTaps="always"
        showsVerticalScrollIndicator={false}>
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
          validador={validadorEntradaStringNumero}
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
      </ScrollView>
      <BotaoEnvolvedor>
        <Botao tipo="preenchido" texto="Salvar" aoPressionar={salvarMorador} />
      </BotaoEnvolvedor>
    </Envolvedor>
  );
};

interface iCabecalhoAdministrarMorador {
  props: StackHeaderProps;
}

export const CabecalhoAdministrarMorador: React.FC<iCabecalhoAdministrarMorador> =
  ({props}) => {
    const {removerMorador} = useContext(ContextoMorador);

    const removerMoradorConfirmar = () => {
      removerMorador(
        (
          props.scene.route as RouteProp<
            RotasMoradoresParametrosLista,
            'administrarMorador'
          >
        ).params.morador,
      ).then(() => {
        props.navigation.goBack();
      });
    };

    return (
      <Cabecalho
        stackCabecalhoProps={props}
        menusAdicionais={[
          {
            acao: () => {
              gerarAlerta(
                'Deseja realmente excluir o morador?',
                removerMoradorConfirmar,
              );
            },
            nome: 'trash',
            texto: 'Excluir',
          },
        ]}
      />
    );
  };

export default AdministrarMorador;
