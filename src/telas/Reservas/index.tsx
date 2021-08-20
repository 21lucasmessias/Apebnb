import React, {useEffect, useState, useContext} from 'react';
import {View} from 'react-native';

import {ContextoAutenticacao} from '../../contextos/ContextoAutenticacao';
import {ContextoReserva} from '../../contextos/ContextoReservas';

import {ActivityIndicator} from 'react-native-paper';
import moment from 'moment';
import {Agenda, AgendaItemsMap, LocaleConfig} from 'react-native-calendars';

import {StackScreenProps} from '@react-navigation/stack';
import {RotasReservasParametrosLista} from './rotas';

import {iReserva} from '../../models/Reserva';
import {configuracaoAgenda, traduzir} from '../../utils/Traduzir';
import {tema} from '../../global/estilos/tema';

import CartaoReserva from '../../componentes/CartaoReserva';

import {
  Envolvedor,
  Texto,
  TextoDia,
  DivisorDia,
  DiaEnvolvedor,
} from './estilos';
import {numeroDuasCasas} from '../../utils/Utils';

const Reservas: React.FC<
  StackScreenProps<RotasReservasParametrosLista, 'reservas'>
> = ({navigation}) => {
  const {usuario} = useContext(ContextoAutenticacao);
  const {
    listarReservasUsuario,
    listarTodasReservas,
    adicionarAtualizacaoAutomaticaReservas,
  } = useContext(ContextoReserva);

  const hoje = new Date();

  const [reservas, setReservas] = useState<AgendaItemsMap<iReserva>>();
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    if (usuario.uid) {
      const removerAtualizacaoAutomaticaReservas =
        adicionarAtualizacaoAutomaticaReservas(atualizarReservas);

      LocaleConfig.locales['br'] = configuracaoAgenda;
      LocaleConfig.defaultLocale = 'br';

      return removerAtualizacaoAutomaticaReservas;
    }
  }, []);

  const atualizarReservas = async () => {
    setCarregando(true);

    const reservas = usuario.usuarioAdministrador
      ? await listarTodasReservas()
      : await listarReservasUsuario(usuario.uid as string);

    const reservasFormatadas: {[date: string]: Array<iReserva>} = {};

    reservas.forEach(async reserva => {
      let data = `${reserva.data.ano}-${numeroDuasCasas(
        reserva.data.mes,
      )}-${numeroDuasCasas(reserva.data.dia)}`;

      if (reservasFormatadas[data]) {
        reservasFormatadas[data].push(reserva);
      } else {
        reservasFormatadas[data] = [reserva];
      }
    });

    setReservas(reservasFormatadas);
    setCarregando(false);
  };

  return (
    <Envolvedor>
      <Texto>Reservas</Texto>
      {carregando ? (
        <ActivityIndicator size="large" color={tema.color.azulEscuro} />
      ) : (
        <Agenda
          items={reservas}
          selected={hoje}
          renderEmptyDate={() => <></>}
          rowHasChanged={(r1, r2) => r1.id !== r2.id}
          renderItem={item => (
            <CartaoReserva navigation={navigation} reserva={item} />
          )}
          renderDay={date => {
            if (date) {
              return (
                <DiaEnvolvedor>
                  <DivisorDia />
                  <TextoDia>
                    {date?.day}
                    {'\n'}
                    {traduzir[moment(date.dateString).format('ddd')]}
                  </TextoDia>
                </DiaEnvolvedor>
              );
            }

            return <View style={{width: 60}}></View>;
          }}
        />
      )}
    </Envolvedor>
  );
};

export default Reservas;
