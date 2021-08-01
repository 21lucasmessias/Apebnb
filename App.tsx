import React from "react"

import ContextoAutenticacaoProvider from "./src/contextos/ContextoAutenticacao";
import ContextoTecladoProvider from "./src/contextos/ContextoTeclado";

import Rotas from "./src/rotas";

export const App: React.FC = () => {
  return (
    <ContextoAutenticacaoProvider>
      <ContextoTecladoProvider>
        <Rotas />  
      </ContextoTecladoProvider>
    </ContextoAutenticacaoProvider>
  );
}