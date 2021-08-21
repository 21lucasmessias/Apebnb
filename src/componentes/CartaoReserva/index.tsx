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
        <DetalhesEnvolvedor>
          {usuario.usuarioAdministrador && (
            <Texto>{reserva.morador.nome}</Texto>
          )}
          <Texto>{iHorario[reserva.horario]}</Texto>
          <Texto>{reserva.ambiente.nome}</Texto>
        </DetalhesEnvolvedor>
      </Envolvedor>
      {(!!reserva.ambiente.foto ||
        (usuario.usuarioAdministrador && !!reserva.morador.foto)) && (
        <Foto
          source={{
            uri: usuario.usuarioAdministrador
              ? !!reserva.morador.foto
                ? reserva.morador.foto
                : reserva.ambiente.foto!
              : reserva.ambiente.foto!,
          }}
        />
      )}
    </Pressionavel>
  );
};

export default CartaoReserva;
