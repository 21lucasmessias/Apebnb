import React from 'react';
import {LogBox} from 'react-native';

import ContextoAutenticacaoProvider from './src/contextos/ContextoAutenticacao';
import ContextoTecladoProvider from './src/contextos/ContextoTeclado';

import Rotas from './src/rotas';

LogBox.ignoreAllLogs();

export const App: React.FC = () => {
  return (
    <ContextoAutenticacaoProvider>
      <ContextoTecladoProvider>
        <Rotas />
      </ContextoTecladoProvider>
    </ContextoAutenticacaoProvider>
  );
};
