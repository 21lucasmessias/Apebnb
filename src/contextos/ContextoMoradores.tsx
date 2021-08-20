import React from 'react';

import {db} from '../configs/firebase';

import {iMorador} from '../models/Morador';

import {mostrarAviso} from '../utils/Animacoes';
import {converterMoradorFirebase} from './ContextoMorador';

interface iContextoMoradores {
  listarTodosMoradoresAprovados: () => Promise<iMorador[]>;
  listarTodosMoradoresDesaprovados: () => Promise<iMorador[]>;
  aprovarMorador: (morador: iMorador) => void;
  adicionarAtualizacaoAutomaticaMoradoresReprovados: (
    atualizarMoradoresReprovados: () => void,
  ) => () => void;
  adicionarAtualizacaoAutomaticaMoradoresAprovados: (
    atualizarMoradoresAprovados: () => void,
  ) => () => void;
}

export const ContextoMoradores = React.createContext({} as iContextoMoradores);

type iContextoMoradoresProvider = {
  children: React.ReactNode;
};

const ContextoMoradoresProvider: React.FC<iContextoMoradoresProvider> = ({
  children,
}) => {
  const adicionarAtualizacaoAutomaticaMoradoresReprovados = (
    atualizarMoradoresReprovados: () => void,
  ) => {
    return db
      .collection('moradores')
      .withConverter(converterMoradorFirebase)
      .where('aprovado', '==', false)
      .onSnapshot(() => {
        atualizarMoradoresReprovados();
      });
  };

  const adicionarAtualizacaoAutomaticaMoradoresAprovados = (
    atualizarMoradoresAprovados: () => void,
  ) => {
    return db
      .collection('moradores')
      .withConverter(converterMoradorFirebase)
      .where('aprovado', '==', true)
      .onSnapshot(() => {
        atualizarMoradoresAprovados();
      });
  };

  const listarTodosMoradoresAprovados = async () => {
    try {
      const moradoresAprovados = await db
        .collection('moradores')
        .withConverter(converterMoradorFirebase)
        .where('aprovado', '==', true)
        .get();

      const moradores: iMorador[] = moradoresAprovados.docs.map(
        moradorAprovado => {
          return {
            ...moradorAprovado.data(),
            id: moradorAprovado.id,
          };
        },
      );

      return moradores;
    } catch (err) {
      console.log(err);
      return [] as iMorador[];
    }
  };

  const listarTodosMoradoresDesaprovados = async () => {
    try {
      const moradoresDesaprovados = await db
        .collection('moradores')
        .withConverter(converterMoradorFirebase)
        .where('aprovado', '==', false)
        .get();

      const moradores: iMorador[] = moradoresDesaprovados.docs.map(morador => {
        return {
          ...morador.data(),
          id: morador.id,
        };
      });

      return moradores;
    } catch (err) {
      console.log(err);
      return [] as iMorador[];
    }
  };

  const aprovarMorador = async (morador: iMorador) => {
    try {
      await db
        .collection('moradores')
        .withConverter(converterMoradorFirebase)
        .doc(morador.id)
        .update({
          aprovado: true,
        });

      mostrarAviso('Usuario aprovado com sucesso.');
    } catch (err) {
      console.log(err);
      mostrarAviso('Algo deu errado.');
    }
  };

  return (
    <ContextoMoradores.Provider
      value={{
        listarTodosMoradoresAprovados,
        listarTodosMoradoresDesaprovados,
        aprovarMorador,
        adicionarAtualizacaoAutomaticaMoradoresReprovados,
        adicionarAtualizacaoAutomaticaMoradoresAprovados,
      }}>
      {children}
    </ContextoMoradores.Provider>
  );
};

export default ContextoMoradoresProvider;
