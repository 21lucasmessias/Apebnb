import React, {useContext, useState} from 'react';

import moment from 'moment';
import Icon from 'react-native-vector-icons/Feather';

import {StackScreenProps} from '@react-navigation/stack';
import {RotasReservasParametrosLista} from '../rotas';

import {ContextoReserva} from '../../../contextos/ContextoReservas';

import {tema} from '../../../global/estilos/tema';
import {iHorario} from '../../../models/Reserva';

import Botao from '../../../componentes/Botao';
import VisualizacaoDeData from '../../../componentes/VisualizacaoDeData';
import VisualizacaoDeHorario from '../../../componentes/VisualizacaoDeHorario';

import {
  Envolvedor,
  EnvolvedorReserva,
  Foto,
  FotoVaziaEnvolvedor,
  Divisor,
  EnvolvedorBotoes,
  Titulo,
  Descricao,
  DivisorVisivel,
  EnvolvedorData,
} from './estilos';
import {ActivityIndicator} from 'react-native-paper';
import {gerarAlerta} from '../../../utils/Utils';

interface iReservaScreen
  extends StackScreenProps<RotasReservasParametrosLista, 'visualizarReserva'> {}

const VisualizarReserva: React.FC<iReservaScreen> = ({route, navigation}) => {
  const {reserva} = route.params;

  const [carregando, setCarregando] = useState(false);

  const {cancelarReserva} = useContext(ContextoReserva);

  const cancelarReservaPressionado = async () => {
    setCarregando(true);
    if (await cancelarReserva(reserva)) {
      navigation.goBack();
    }
    setCarregando(false);
  };

  return (
    <Envolvedor>
      <EnvolvedorReserva showsVerticalScrollIndicator={false}>
        {!!reserva.ambiente.foto && (
          <Foto source={{uri: reserva.ambiente.foto}} />
        )}

        <Divisor />

        <Titulo>{reserva.ambiente.nome}</Titulo>

        <Divisor />

        <Descricao>{reserva.ambiente.descricao}</Descricao>

        <DivisorVisivel />

        <EnvolvedorData>
          <VisualizacaoDeData data={reserva.data} />

          <Divisor />

          <VisualizacaoDeHorario horarioEscolhido={iHorario[reserva.horario]} />
        </EnvolvedorData>
      </EnvolvedorReserva>

      {carregando && (
        <ActivityIndicator size="large" color={tema.color.azulEscuro} />
      )}

      <EnvolvedorBotoes>
        <Botao
          tipo="preenchido"
          texto="Cancelar Reserva"
          aoPressionar={() => {
            gerarAlerta(
              'Deseja realmente cancelar a reserva?',
              cancelarReservaPressionado,
            );
          }}
        />
      </EnvolvedorBotoes>
    </Envolvedor>
  );
};

export default VisualizarReserva;
