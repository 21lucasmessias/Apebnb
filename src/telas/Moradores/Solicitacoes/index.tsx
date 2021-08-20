import React from 'react';

import {StackScreenProps} from '@react-navigation/stack';
import {RotasMoradoresParametrosLista} from '../rotas';

import ListaSolicitacoesMoradores from '../../../componentes/ListaSolicitacoesMoradores';

import {Envolvedor, SubTitulo} from './estilos';

const Solicitacoes: React.FC<
  StackScreenProps<RotasMoradoresParametrosLista, 'solicitacoes'>
> = navigation => {
  return (
    <Envolvedor>
      <SubTitulo>Solicitações</SubTitulo>

      <ListaSolicitacoesMoradores navigation={navigation.navigation} />
    </Envolvedor>
  );
};

export default Solicitacoes;
