import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import {tema} from '../../global/estilos/tema';

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

const CabecalhoItemAnimacoes: React.FC<iCabecalhoItem> = ({
  posicao,
  item,
  visivel,
  tamanho,
  children,
}) => {
  const opacidadeItem = useSharedValue(0);
  const animacaoOpacidade = useAnimatedStyle(() => {
    return {
      opacity: opacidadeItem.value,
    };
  });

  useEffect(() => {
    if (visivel) {
      opacidadeItem.value = withTiming(1, {
        duration: (posicao + 1) * 200,
      });
    } else {
      opacidadeItem.value = withTiming(0, {
        duration: (tamanho - posicao) * 200,
      });
    }
  }, [visivel]);

  return (
    <Animated.View
      key={`${item.nome}${item.texto}${posicao}`}
      onTouchStart={item.acao}
      style={[animacaoOpacidade, styles.conteinerItem]}>
      {children}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  conteinerItem: {
    alignSelf: 'flex-end',
    flexDirection: 'row',
    padding: 8,
    width: 120,
    backgroundColor: tema.color.azulEscuro,
    borderRadius: 10,
    marginHorizontal: 8,
    marginVertical: 2,
  },
});

export default CabecalhoItemAnimacoes;
