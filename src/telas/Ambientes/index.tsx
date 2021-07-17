import React from 'react'

import ContextoAmbientesProvider from '../../contextos/ContextoAmbientes'

import { StackScreenProps } from '@react-navigation/stack'
import { RotasAmbientesParamsList } from './rotas'

import ListaAmbientes from '../../componentes/ListaAmbientes'

import {
  Envolvedor,
  Corpo,
  Titulo,
  SubTitulo
} from './estilos'

const Ambientes: React.FC<StackScreenProps<RotasAmbientesParamsList>> = (navigation) => {
  return (
    <ContextoAmbientesProvider>
      <Envolvedor>
        <Titulo>Olá Lucas</Titulo>
        <SubTitulo>Ambientes</SubTitulo>
        <ListaAmbientes
          navigation={navigation.navigation}
        />
      </Envolvedor>
    </ContextoAmbientesProvider>
  )
}

export default Ambientes;