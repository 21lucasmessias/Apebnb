import React, {useContext} from 'react';

import Icon from 'react-native-vector-icons/Feather';

import {ContextoAutenticacao} from '../../contextos/ContextoAutenticacao';

import {StackNavigationProp} from '@react-navigation/stack';
import {RotasReservasParametrosLista} from '../../telas/Reservas/rotas';

import {iHorario, iReserva} from '../../models/Reserva';
import {tema} from '../../global/estilos/tema';

import {
  DetalhesEnvolvedor,
  Envolvedor,
  Foto,
  FotoVaziaEnvolvedor,
  Pressionavel,
  Texto,
} from './estilos';

interface iCartaoReserva {
  reserva: iReserva;
  navigation: StackNavigationProp<RotasReservasParametrosLista, 'reservas'>;
}

const CartaoReserva: React.FC<iCartaoReserva> = ({reserva, navigation}) => {
  const {usuario} = useContext(ContextoAutenticacao);

  const pressHandler = () => {
    navigation.navigate('visualizarReserva', {reserva});
  };

  return (
    <Pressionavel activeOpacity={0.7} onPress={pressHandler}>
      <Envolvedor>
        {false ? (
          <Foto source={{uri: 'morador.foto'}} />
        ) : (
          <FotoVaziaEnvolvedor>
            <Icon name="camera" size={24} color={tema.color.azulEscuro} />
          </FotoVaziaEnvolvedor>
        )}

        <DetalhesEnvolvedor>
          {usuario.usuarioAdministrador && (
            <Texto>{reserva.morador.nome}</Texto>
          )}
          <Texto>{iHorario[reserva.horario]}</Texto>
          <Texto>{reserva.ambiente.nome}</Texto>
        </DetalhesEnvolvedor>
      </Envolvedor>
    </Pressionavel>
  );
};

export default CartaoReserva;
