import React, {useState, useContext} from 'react';

import {Keyboard} from 'react-native';
import * as ImagePicker from 'react-native-image-picker';

import {RouteProp} from '@react-navigation/native';
import {StackHeaderProps, StackScreenProps} from '@react-navigation/stack';
import {RotasAmbientesParamsList} from '../rotas';

import {ContextoAmbientes} from '../../../contextos/ContextoAmbientes';

import Icon from 'react-native-vector-icons/Feather';

import {iAmbiente} from '../../../models/Ambiente';
import {
  validadorTituloAmbiente,
  validadorDescricaoAmbiente,
} from '../../../utils/Validadores';
import {tema} from '../../../global/estilos/tema';
import {gerarAlerta} from '../../../utils/Utils';

import EntradaDeDados from '../../../componentes/EntradaDeDados';
import EntradaDeDadosArea from '../../../componentes/EntradaDeDadosArea';
import SeletorDiasSemana from '../../../componentes/SeletorDiasSemana';
import Botao from '../../../componentes/Botao';

import Cabecalho from '../../../componentes/Cabecalho';

import {
  Conteiner,
  Envolvedor,
  Foto,
  FotoEnvolvedor,
  Divisor,
  EnvolvedorBotoes,
} from './estilos';

interface iAmbienteScreen
  extends StackScreenProps<RotasAmbientesParamsList, 'administrarAmbiente'> {}

const AdministrarAmbiente: React.FC<iAmbienteScreen> = ({route}) => {
  const {ambiente} = route.params;

  const {atualizarAmbiente} = useContext(ContextoAmbientes);

  const [nome, setNome] = useState(ambiente.nome);
  const [descricao, setDescricao] = useState(ambiente.descricao);
  const [foto, setFoto] = useState(ambiente.foto ? ambiente.foto : '');
  const [diasSemana, setDiasSemana] = useState(ambiente.diasDisponiveis);

  const salvarAmbiente = () => {
    Keyboard.dismiss();

    let novoAmbiente: iAmbiente = {
      id: ambiente.id,
      descricao: descricao,
      nome: nome,
      foto: foto,
      diasDisponiveis: diasSemana,
    };

    atualizarAmbiente(novoAmbiente);
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
    <Conteiner>
      <Envolvedor showsVerticalScrollIndicator={false}>
        {foto ? (
          <FotoEnvolvedor onPress={carregarImagem}>
            <Foto source={{uri: foto}} />
          </FotoEnvolvedor>
        ) : (
          <FotoEnvolvedor onPress={carregarImagem}>
            <Icon name="camera" size={24} color={tema.color.azulEscuro} />
          </FotoEnvolvedor>
        )}

        <Divisor />

        <EntradaDeDados
          nome="T??tulo"
          validador={validadorTituloAmbiente}
          valor={nome}
          setValor={setNome}
        />

        <Divisor />

        <EntradaDeDadosArea
          nome="Descri????o"
          validador={validadorDescricaoAmbiente}
          valor={descricao}
          setValor={setDescricao}
        />

        <Divisor />

        <SeletorDiasSemana
          diasDisponiveis={diasSemana}
          setDiasDisponiveis={setDiasSemana}
        />
      </Envolvedor>

      <EnvolvedorBotoes>
        <Botao tipo="preenchido" texto="Salvar" aoPressionar={salvarAmbiente} />
      </EnvolvedorBotoes>
    </Conteiner>
  );
};

interface iCabecalhoAdministrarAmbiente {
  props: StackHeaderProps;
}

export const CabecalhoAdministrarAmbiente: React.FC<iCabecalhoAdministrarAmbiente> =
  ({props}) => {
    const {removerAmbiente} = useContext(ContextoAmbientes);

    const removerAmbienteConfirm = () => {
      removerAmbiente(
        (
          props.scene.route as RouteProp<
            RotasAmbientesParamsList,
            'administrarAmbiente'
          >
        ).params.ambiente,
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
                'Deseja realmente excluir o ambiente?',
                removerAmbienteConfirm,
              );
            },
            nome: 'trash-2',
            texto: 'Excluir',
          },
        ]}
      />
    );
  };

export default AdministrarAmbiente;
