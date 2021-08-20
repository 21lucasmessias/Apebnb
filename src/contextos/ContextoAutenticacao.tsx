import React, {useEffect, useState} from 'react';

import moment from 'moment';

import {auth, db} from '../configs/firebase';

import {converterMoradorFirebase} from './ContextoMorador';
import {mostrarAviso} from '../utils/Animacoes';
import {converterReservaFirebase} from './ContextoReservas';

type iUsuario = {
  usuarioAdministrador: boolean | undefined;
  uid: string | null;
};

interface iContextoAutenticacao {
  usuario: iUsuario;
  autenticar: (email: string, senha: string) => Promise<void>;
  criarConta: (
    nome: string,
    cpf: string,
    email: string,
    senha: string,
  ) => Promise<void>;
  sair: () => Promise<void>;
  recuperarSenha: (email: string) => Promise<void>;
}

export const ContextoAutenticacao = React.createContext(
  {} as iContextoAutenticacao,
);

type iContextoAutenticacaoProvider = {
  children: React.ReactNode;
};

const ContextoAutenticacaoProvider: React.FC<iContextoAutenticacaoProvider> = ({
  children,
}) => {
  const [usuario, setUsuario] = useState<iUsuario>({
    usuarioAdministrador: undefined,
    uid: null,
  });

  useEffect(() => {
    const removerListener = auth.onAuthStateChanged(async novoUsuario => {
      if (novoUsuario) {
        try {
          const morador = await db
            .collection('moradores')
            .withConverter(converterMoradorFirebase)
            .doc(novoUsuario.uid)
            .get();

          if (morador.exists) {
            await removerReservasAntigas(novoUsuario.uid);

            setUsuario({
              usuarioAdministrador: morador.data()!.moradorAdministrador,
              uid: novoUsuario.uid,
            });
          } else {
            mostrarAviso('Usuário excluído pelo administrador.', true);
            novoUsuario.delete();
          }
        } catch (err) {
          console.log(err);
          mostrarAviso('Credencias inválidas.');
          setUsuario({
            usuarioAdministrador: undefined,
            uid: null,
          });
        }
      } else {
        setUsuario({
          usuarioAdministrador: undefined,
          uid: null,
        });
      }
    });

    return removerListener;
  }, []);

  const removerReservasAntigas = async (id: string) => {
    let hoje = moment(new Date());

    const reservas = await db
      .collection('reservas')
      .withConverter(converterReservaFirebase)
      .where('morador.id', '==', id)
      .get();

    const batch = db.batch();

    reservas.docs
      .filter(reserva => {
        return (
          reserva.data().data.ano < hoje.year() ||
          reserva.data().data.mes < hoje.month() + 1 ||
          reserva.data().data.dia < hoje.date()
        );
      })
      .map(reserva => {
        batch.delete(reserva.ref);
      });

    await batch.commit();
  };

  const autenticar = async (email: string, senha: string) => {
    try {
      await auth.signInWithEmailAndPassword(email, senha);
    } catch (err) {
      console.log(err);
      mostrarAviso('Credencias inválidas.');
    }
  };

  const criarConta = async (
    nome: string,
    cpf: string,
    email: string,
    senha: string,
  ) => {
    try {
      const novoUsuario = await auth.createUserWithEmailAndPassword(
        email,
        senha,
      );

      if (novoUsuario.user) {
        try {
          await db
            .collection('moradores')
            .withConverter(converterMoradorFirebase)
            .doc(`${novoUsuario.user.uid}`)
            .set({
              id: novoUsuario.user.uid,
              nome: nome,
              cpf: cpf,
              email: email,
              aprovado: false,
              moradorAdministrador: false,
            });
        } catch (err) {
          console.log(err);
          mostrarAviso('Algo deu errado. Contate o desenvolvedor.');
        }
      }
    } catch (err) {
      console.log(err);
      mostrarAviso('Credencias inválidas.');
    }
  };

  const sair = async () => {
    try {
      await auth.signOut();
    } catch (err) {
      console.log(err);
      mostrarAviso('Algo deu errado. Contate o desenvolvedor.');
    }
  };

  const recuperarSenha = async (email: string) => {
    try {
      await auth.sendPasswordResetEmail(email);
    } catch (err) {
      console.log(err);
      mostrarAviso('Algo deu errado. Contate o desenvolvedor.');
    }
  };

  return (
    <ContextoAutenticacao.Provider
      value={{
        usuario,
        autenticar,
        sair,
        criarConta,
        recuperarSenha,
      }}>
      {children}
    </ContextoAutenticacao.Provider>
  );
};

export default ContextoAutenticacaoProvider;
