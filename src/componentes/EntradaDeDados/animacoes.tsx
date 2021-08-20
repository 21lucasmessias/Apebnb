import React, {useEffect} from 'react';
import {StyleSheet, TextInput, TouchableWithoutFeedback} from 'react-native';

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import {tema} from '../../global/estilos/tema';
import {comBalanco, semBalanco} from '../../utils/Animacoes';

import {Texto} from './estilos';

interface iAnimacoesEntradaDeDados {
  valor: string;
  nome: string;
  entradaTextoRef: React.Ref<TextInput> | undefined;
}

const AnimacoesEntradaDeDados: React.FC<iAnimacoesEntradaDeDados> = ({
  valor,
  nome,
  entradaTextoRef,
  children,
}) => {
  const topoNomeCampo = useSharedValue(10);
  const esquerdaNomeCampo = useSharedValue(20);
  const corNomeCampo = useSharedValue(tema.color.fosco);

  const alturaEnvolvedor = useSharedValue(65);

  const nomeCampoAnimacao = useAnimatedStyle(() => {
    return {
      top: topoNomeCampo.value,
      left: esquerdaNomeCampo.value,
      color: corNomeCampo.value,
    };
  });

  const envolvedorAnimacao = useAnimatedStyle(() => {
    return {
      height: alturaEnvolvedor.value,
    };
  });

  useEffect(() => {
    if (valor != '') {
      topoNomeCampo.value = withSpring(-8, comBalanco);
      esquerdaNomeCampo.value = withSpring(12, comBalanco);
      corNomeCampo.value = tema.color.azulEscuro;

      alturaEnvolvedor.value = withSpring(86, semBalanco);
    } else {
      topoNomeCampo.value = withSpring(15, comBalanco);
      esquerdaNomeCampo.value = withSpring(20, comBalanco);
      corNomeCampo.value = tema.color.fosco;

      alturaEnvolvedor.value = withSpring(65, semBalanco);
    }
  }, [valor]);

  return (
    <Animated.View style={[envolvedorAnimacao]}>
      {children}

      <Animated.View
        style={[{position: 'absolute'}, nomeCampoAnimacao]}
        focusable={false}>
        <TouchableWithoutFeedback
          onLongPress={() => {}}
          onPress={() => {
            // @ts-ignore: Unreachable code error
            if (!entradaTextoRef.current?.isFocused())
              // @ts-ignore: Unreachable code error
              entradaTextoRef.current?.focus();
          }}>
          <Texto>{nome}</Texto>
        </TouchableWithoutFeedback>
      </Animated.View>
    </Animated.View>
  );
};

export default AnimacoesEntradaDeDados;
