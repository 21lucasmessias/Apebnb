import React from 'react';

import firebase from 'firebase';
import {db} from '../configs/firebase';

import {iHorario, iReserva} from '../models/Reserva';
import {mostrarAviso} from '../utils/Animacoes';
import moment from 'moment';

interface iContextoReserva {
  criarReserva: (reserva: iReserva, aprovado: boolean) => Promise<boolean>;
  listarReservasUsuario: (idUsuario: string) => Promise<iReserva[]>;
  atualizarReserva: (reserva: iReserva) => Promise<void>;
  cancelarReserva: (reserva: iReserva) => Promise<boolean>;
  adicionarAtualizacaoAutomaticaReservas: (
    atualizarReservas: () => void,
  ) => () => void;
  listarTodasReservas: () => Promise<iReserva[]>;
  listarHorariosDisponiveis: (
    idAmbiente: string,
    data: iReserva['data'],
  ) => Promise<iHorario[]>;
}

type iContextoReservaProvider = {
  children: React.ReactNode;
};

export const ContextoReserva = React.createContext({} as iContextoReserva);

export const converterReservaFirebase = {
  toFirestore: (data: iReserva) => data,
  fromFirestore: (snap: firebase.firestore.QueryDocumentSnapshot) =>
    snap.data() as iReserva,
};

const ContextoReservaProvider: React.FC<iContextoReservaProvider> = ({
  children,
}) => {
  const criarReserva = async (reserva: iReserva, aprovado: boolean) => {
    if (aprovado) {
      try {
        let reservaCriada = await db
          .collection('reservas')
          .withConverter(converterReservaFirebase)
          .add(reserva);

        await reservaCriada.update({
          id: reservaCriada.id,
        });

        mostrarAviso('Reserva criada com sucesso.');

        return true;
      } catch (err) {
        console.log(err);
        mostrarAviso('Um erro ocorreu. Contate o desenvolvedor.');
      }
    } else {
      mostrarAviso('Usuário aguardando aprovação.');
    }

    return false;
  };

  const listarReservasUsuario = async (idUsuario: string) => {
    const hoje = moment(new Date());

    try {
      let response = db
        .collection('reservas')
        .where('morador.id', '==', idUsuario)
        .orderBy('horario');

      let reservas = await response
        .withConverter(converterReservaFirebase)
        .get();

      if (reservas.empty) return [];

      return reservas.docs
        .map(doc => doc.data())
        .filter(reserva => {
          return (
            reserva.data.ano >= hoje.year() &&
            reserva.data.mes >= hoje.month() + 1 &&
            reserva.data.dia >= hoje.date()
          );
        });
    } catch (err) {
      console.log(err);
      mostrarAviso('Um erro ocorreu. Contate o desenvolvedor.');
    }

    return [];
  };

  const atualizarReserva = async (reserva: iReserva) => {
    try {
      await db
        .collection('reservas')
        .withConverter(converterReservaFirebase)
        .doc(reserva.id)
        .update(reserva);

      mostrarAviso('Reserva atualizada com sucesso.');
    } catch (err) {
      console.log(err);
      mostrarAviso('Um erro ocorreu. Contate o desenvolvedor.');
    }
  };

  const cancelarReserva = async (reserva: iReserva) => {
    try {
      await db
        .collection('reservas')
        .withConverter(converterReservaFirebase)
        .doc(reserva.id)
        .delete();

      mostrarAviso('Reserva cancelada com sucesso.');

      return true;
    } catch (err) {
      console.log(err);
      mostrarAviso('Um erro ocorreu. Contate o desenvolvedor.');
    }

    return false;
  };

  const adicionarAtualizacaoAutomaticaReservas = (
    refreshReservas: () => void,
  ) => {
    return db.collection('reservas').onSnapshot(() => {
      refreshReservas();
    });
  };

  const listarTodasReservas = async () => {
    try {
      let reservas = await db
        .collection('reservas')
        .withConverter(converterReservaFirebase)
        .get();

      if (reservas.empty) return [];

      reservas.docs.filter(r => {
        let data = new Date(
          r.data().data.ano,
          r.data().data.mes,
          r.data().data.dia,
        );
        return moment(data).isAfter(moment(new Date()).subtract({day: 1}));
      });

      return reservas.docs.map(doc => doc.data());
    } catch (err) {
      console.log(err);
      mostrarAviso('Um erro ocorreu. Contate o desenvolvedor.');
    }

    return [];
  };

  const listarHorariosDisponiveis = async (
    idAmbiente: string,
    data: iReserva['data'],
  ) => {
    let reservas = await db
      .collection('reservas')
      .where('data', '==', data)
      .where('ambiente.id', '==', idAmbiente)
      .withConverter(converterReservaFirebase)
      .get();

    const horariosReservados: iHorario[] = reservas.docs.map(reserva => {
      return reserva.data().horario;
    });

    let horariosDisponiveis: iHorario[] = [
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
      21, 22, 23,
    ].filter(horario => !horariosReservados.includes(horario));

    return horariosDisponiveis;
  };

  return (
    <ContextoReserva.Provider
      value={{
        criarReserva,
        listarReservasUsuario,
        atualizarReserva,
        cancelarReserva,
        adicionarAtualizacaoAutomaticaReservas,
        listarTodasReservas,
        listarHorariosDisponiveis,
      }}>
      {children}
    </ContextoReserva.Provider>
  );
};

export default ContextoReservaProvider;
