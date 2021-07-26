import React from 'react'
import { StackScreenProps } from '@react-navigation/stack'

import { RotasMoradoresParamsList } from '../rotas'
import ContextoMoradoresProvider from '../../../contextos/ContextoMoradores'

import {
  Envolvedor,
  SubTitulo,
} from './estilos'
import ListaSolicitacoesMoradores from '../../../componentes/ListaSolicitacoesMoradores'

const Solicitacoes: React.FC<StackScreenProps<RotasMoradoresParamsList, 'solicitacoes'>> = (navigation) => {
  return (
    <ContextoMoradoresProvider>
      <Envolvedor>
        <SubTitulo>Solicitações</SubTitulo>

        <ListaSolicitacoesMoradores
          navigation={navigation.navigation}
        />
      </Envolvedor>
    </ContextoMoradoresProvider>
  )
}

export default Solicitacoes;