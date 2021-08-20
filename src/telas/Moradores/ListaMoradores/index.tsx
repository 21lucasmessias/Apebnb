import React from 'react';

import {StackScreenProps} from '@react-navigation/stack';
import {RotasMoradoresParametrosLista} from '../rotas';

import ListaMoradores from '../../../componentes/ListaMoradores';
import Botao from '../../../componentes/Botao';

import {Envolvedor, SubTitulo, EnvolvedorBotoes, Divisor} from './estilos';

const Moradores: React.FC<
  StackScreenProps<RotasMoradoresParametrosLista, 'moradores'>
> = navigation => {
  return (
    <Envolvedor>
      <SubTitulo>Moradores</SubTitulo>

      <EnvolvedorBotoes>
        <Botao
          aoPressionar={() => {
            navigation.navigation.navigate('solicitacoes');
          }}
          texto="Solicitações"
          tipo="preenchido"
        />

        <Divisor />
      </EnvolvedorBotoes>

      <ListaMoradores navigation={navigation.navigation} />
    </Envolvedor>
  );
};

export default Moradores;
