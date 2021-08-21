import React from 'react';

import firebase from 'firebase';
import {auth, db} from '../configs/firebase';

import {iMorador} from '../models/Morador';
import {mostrarAviso} from '../utils/Animacoes';
import {converterReservaFirebase} from './ContextoReservas';

interface iContextoMorador {
  procurarMoradorPorId: (id: string) => Promise<iMorador>;
  alterarMorador: (morador: iMorador, senha: string | null) => Promise<void>;
  adicionarAtualizacaoAutomaticaNomeMorador: (
    id: string,
    atualizarNomeUsuario: (nome: string) => void,
  ) => () => void;
  removerMorador: (morador: iMorador) => Promise<void>;
}

type iContextoMoradorProvider = {
  children: React.ReactNode;
};

export const ContextoMorador = React.createContext({} as iContextoMorador);

export const converterMoradorFirebase = {
  toFirestore: (data: iMorador) => data,
  fromFirestore: (snap: firebase.firestore.QueryDocumentSnapshot) =>
    snap.data() as iMorador,
};

const ContextoMoradorProvider: React.FC<iContextoMoradorProvider> = ({
  children,
}) => {
  const adicionarAtualizacaoAutomaticaNomeMorador = (
    id: string,
    atualizarNomeUsuario: (nome: string) => void,
  ) => {
    var removerListener = db
      .collection('moradores')
      .withConverter(converterMoradorFirebase)
      .doc(id)
      .onSnapshot(morador => {
        atualizarNomeUsuario(morador.data()!.nome);
      });

    return removerListener;
  };

  const procurarMoradorPorId = async (id: string) => {
    let dados: iMorador;

    try {
      const morador = await db
        .collection('moradores')
        .withConverter(converterMoradorFirebase)
        .doc(id)
        .get();

      if (morador.exists) {
        dados = morador.data()!;
      }

      return dados!;
    } catch (err) {
      console.log(err);
      mostrarAviso('Algo deu errado. Contate o desenvolvedor.');
    }

    return dados!;
  };

  const alterarMorador = async (morador: iMorador, senha: string | null) => {
    try {
      if (senha) {
        await auth.currentUser!.updatePassword(senha);
      }

      await db
        .collection('moradores')
        .withConverter(converterMoradorFirebase)
        .doc(morador.id)
        .update(morador);

      mostrarAviso('Dados alterados com sucesso');
    } catch (err) {
      mostrarAviso('Algo deu errado. Contate o desenvolvedor.');
      console.log(`Erro  ao alterarMorador`, err);
    }
  };

  const removerMorador = async (morador: iMorador) => {
    const batch = db.batch();

    const moradorRef = db.collection('moradores').doc(morador.id);

    const reservasRef = await db
      .collection('reservas')
      .withConverter(converterReservaFirebase)
      .where('morador.id', '==', morador.id)
      .get();

    try {
      batch.delete(moradorRef);

      reservasRef.forEach(r => {
        batch.delete(r.ref);
      });

      await batch.commit();

      mostrarAviso('Morador e reservas removidas com sucesso.');
    } catch (err) {
      console.log(err);
      mostrarAviso('Erro ao remover morador.');
    }
  };

  return (
    <ContextoMorador.Provider
      value={{
        procurarMoradorPorId,
        alterarMorador,
        adicionarAtualizacaoAutomaticaNomeMorador,
        removerMorador,
      }}>
      {children}
    </ContextoMorador.Provider>
  );
};

export default ContextoMoradorProvider;
