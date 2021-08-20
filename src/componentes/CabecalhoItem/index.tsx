import React from 'react';

import Icon from 'react-native-vector-icons/Feather';

import {tema} from '../../global/estilos/tema';
import CabecalhoItemAnimacoes from './animacoes';

import {Pressionavel, Texto} from './estilos';

export interface iCabecalhoItem {
  item: {
    nome: string;
    texto: string;
    acao: () => void;
  };
  posicao: number;
  tamanho: number;
  visivel: boolean;
}

const CabecalhoItem: React.FC<iCabecalhoItem> = ({
  posicao,
  item,
  visivel,
  tamanho,
}) => {
  return (
    <CabecalhoItemAnimacoes
      item={item}
      tamanho={tamanho}
      posicao={posicao}
      visivel={visivel}>
      <Pressionavel>
        <Icon name={item.nome} size={24} color={tema.color.ouro} />
        <Texto>{item.texto}</Texto>
      </Pressionavel>
    </CabecalhoItemAnimacoes>
  );
};

export default CabecalhoItem;
