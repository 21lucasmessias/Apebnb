import React, {useRef, useState, useContext} from 'react';

import {Keyboard, View} from 'react-native';

import {ContextoAmbientes} from '../../../contextos/ContextoAmbientes';

import {StackScreenProps} from '@react-navigation/stack';
import {RotasAmbientesParamsList} from '../rotas';

import Icon from 'react-native-vector-icons/Feather';

import {iAmbiente} from '../../../models/Ambiente';
import {
  validadorTituloAmbiente,
  validadorDescricaoAmbiente,
} from '../../../utils/Validadores';
import {tema} from '../../../global/estilos/tema';

import EntradaDeDados from '../../../componentes/EntradaDeDados';
import EntradaDeDadosArea from '../../../componentes/EntradaDeDadosArea';
import SeletorDiasSemana from '../../../componentes/SeletorDiasSemana';
import Botao from '../../../componentes/Botao';

import {
  Conteiner,
  Envolvedor,
  Foto,
  FotoVaziaEnvolvedor,
  Divisor,
  EnvolvedorBotoes,
} from './estilos';

interface iCriarAmbienteScreen
  extends StackScreenProps<RotasAmbientesParamsList, 'criarAmbiente'> {}

const CriarAmbienteScreen: React.FC<iCriarAmbienteScreen> = ({navigation}) => {
  const {criarAmbiente} = useContext(ContextoAmbientes);

  const diasSemanaRef = useRef<View>(null);

  const [foto, setFoto] = useState<string | null>(null);
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [diasSemana, setDiasSemana] = useState([
    true,
    true,
    true,
    true,
    true,
    true,
    true,
  ]);

  const salvarAmbiente = async () => {
    Keyboard.dismiss();

    let novoAmbiente: iAmbiente = {
      id: '',
      descricao: descricao,
      nome: nome,
      foto: foto,
      diasDisponiveis: [
        diasSemana[0],
        diasSemana[1],
        diasSemana[2],
        diasSemana[3],
        diasSemana[4],
        diasSemana[5],
        diasSemana[6],
      ],
    };

    const ambienteCriado = await criarAmbiente(novoAmbiente);

    if (ambienteCriado) {
      navigation.goBack();
    }
  };

  return (
    <Conteiner>
      <Envolvedor showsVerticalScrollIndicator={false}>
        {foto ? (
          <Foto source={{uri: foto}} />
        ) : (
          <FotoVaziaEnvolvedor>
            <Icon name="camera" size={24} color={tema.color.azulEscuro} />
          </FotoVaziaEnvolvedor>
        )}

        <Divisor />

        <EntradaDeDados
          nome="Título"
          validador={validadorTituloAmbiente}
          valor={nome}
          setValor={setNome}
        />

        <Divisor />

        <EntradaDeDadosArea
          nome="Descrição"
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

export default CriarAmbienteScreen;
