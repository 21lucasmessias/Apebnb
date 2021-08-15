import React from 'react'

import { StackScreenProps } from '@react-navigation/stack'
import { RotasMoradoresParamsList } from '../rotas'

import ListaSolicitacoesMoradores from '../../../componentes/ListaSolicitacoesMoradores'

import {
  Envolvedor,
  SubTitulo,
} from './estilos'

const Solicitacoes: React.FC<StackScreenProps<RotasMoradoresParamsList, 'solicitacoes'>> = (navigation) => {
  return (
    <Envolvedor>
      <SubTitulo>Solicitações</SubTitulo>

      <ListaSolicitacoesMoradores navigation={navigation.navigation}/>
    </Envolvedor>
  )
}

export default Solicitacoes;