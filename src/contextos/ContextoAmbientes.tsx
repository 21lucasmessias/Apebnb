import React from 'react';

import firebase from 'firebase';
import {db} from '../configs/firebase';

import {iAmbiente} from '../models/Ambiente';
import {mostrarAviso} from '../utils/Animacoes';
import {converterReservaFirebase} from './ContextoReservas';

interface iContextoAmbientes {
  criarAmbiente: (ambiente: iAmbiente) => Promise<boolean>;
  removerAmbiente: (ambiente: iAmbiente) => Promise<void>;
  atualizarAmbiente: (ambiente: iAmbiente) => Promise<void>;
  listarTodosAmbientes: () => Promise<iAmbiente[]>;
  procurarAmbientePorId: (id: string) => Promise<iAmbiente | null>;
  adicionarAtualizacaoAutomaticaAmbientes: (
    atualizarAmbientes: () => void,
  ) => () => void;
}

export const ContextoAmbientes = React.createContext({} as iContextoAmbientes);

type iContextoAmbientesProvider = {
  children: React.ReactNode;
};

export const converterAmbienteFirebase = {
  toFirestore: (data: iAmbiente) => data,
  fromFirestore: (snap: firebase.firestore.QueryDocumentSnapshot) =>
    snap.data() as iAmbiente,
};

const ContextoAmbientesProvider: React.FC<iContextoAmbientesProvider> = ({
  children,
}) => {
  const adicionarAutoRefreshAmbientes = (atualizarAmbientes: () => void) => {
    return db
      .collection('ambientes')
      .withConverter(converterAmbienteFirebase)
      .onSnapshot(() => {
        atualizarAmbientes();
      });
  };

  const listarTodosAmbientes = async () => {
    try {
      const res = await db
        .collection('ambientes')
        .withConverter(converterAmbienteFirebase)
        .get();

      const ambientes = res.docs.map(doc => doc.data());

      return ambientes;
    } catch (err) {
      console.log(err);
      return [] as iAmbiente[];
    }
  };

  const procurarAmbientePorId = async (id: string) => {
    try {
      const ambiente = await db
        .collection('ambientes')
        .withConverter(converterAmbienteFirebase)
        .doc(id)
        .get();

      if (!ambiente.exists) return null;

      return ambiente.data() as iAmbiente;
    } catch (err) {
      console.log(err);
      return null;
    }
  };

  const criarAmbiente = async (ambiente: iAmbiente) => {
    try {
      const ambienteRef = await db
        .collection('ambientes')
        .withConverter(converterAmbienteFirebase)
        .add(ambiente);

      await ambienteRef.update({id: ambienteRef.id});

      mostrarAviso('Ambiente criado com sucesso.');

      return true;
    } catch (err) {
      console.log(err);
      mostrarAviso('Um erro ocorreu. Contate o desenvolvedor.');
    }

    return false;
  };

  const atualizarAmbiente = async (ambiente: iAmbiente) => {
    try {
      await db
        .collection('ambientes')
        .withConverter(converterAmbienteFirebase)
        .doc(ambiente.id)
        .update(ambiente);

      mostrarAviso('Ambiente atualizado com sucesso.');
    } catch (err) {
      console.log(err);
      mostrarAviso('Um erro ocorreu. Contate o desenvolvedor.');
    }
  };

  const removerAmbiente = async (ambiente: iAmbiente) => {
    try {
      const batch = db.batch();

      const ambienteRef = db
        .collection('ambientes')
        .withConverter(converterAmbienteFirebase)
        .doc(ambiente.id);

      const reservas = await db
        .collection('reservas')
        .withConverter(converterReservaFirebase)
        .where('ambiente.id', '==', ambiente.id)
        .get();

      batch.delete(ambienteRef);

      reservas.docs.forEach(reserva => {
        batch.delete(reserva.ref);
      });

      await batch.commit();

      mostrarAviso('Ambiente e reservas removidas com sucesso.');
    } catch (err) {
      console.log(err);
      mostrarAviso('Erro ao remover ambiente.');
    }
  };

  return (
    <ContextoAmbientes.Provider
      value={{
        criarAmbiente,
        removerAmbiente,
        atualizarAmbiente,
        listarTodosAmbientes,
        procurarAmbientePorId,
        adicionarAtualizacaoAutomaticaAmbientes: adicionarAutoRefreshAmbientes,
      }}>
      {children}
    </ContextoAmbientes.Provider>
  );
};

export default ContextoAmbientesProvider;
