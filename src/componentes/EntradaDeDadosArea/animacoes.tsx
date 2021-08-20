import React, {useEffect} from 'react';
import {StyleSheet, TextInput, TextInputProps} from 'react-native';

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import {tema} from '../../global/estilos/tema';
import {comBalanco, semBalanco} from '../../utils/Animacoes';

interface iAnimacoesEntradaDeDadosArea extends TextInputProps {
  valor: string;
  nome: string;
  entradaTextoRef: React.Ref<TextInput> | undefined;
}

const AnimacoesEntradaDeDadosArea: React.FC<iAnimacoesEntradaDeDadosArea> = ({
  valor,
  nome,
  entradaTextoRef,
  children,
}) => {
  const topoNomeCampo = useSharedValue(10);
  const esquerdaNomeCampo = useSharedValue(20);
  const corNomeCampo = useSharedValue(tema.color.fosco);

  const heightEnvolvedor = useSharedValue(140);

  const nomeCampoAnimacao = useAnimatedStyle(() => {
    return {
      top: topoNomeCampo.value,
      left: esquerdaNomeCampo.value,
      color: corNomeCampo.value,
    };
  });

  const envolvedorAnimacao = useAnimatedStyle(() => {
    return {
      height: heightEnvolvedor.value,
    };
  });

  useEffect(() => {
    if (valor != '') {
      topoNomeCampo.value = withSpring(0, comBalanco);
      esquerdaNomeCampo.value = withSpring(4, comBalanco);
      corNomeCampo.value = tema.color.azulEscuro;

      heightEnvolvedor.value = withSpring(170, semBalanco);
    } else {
      topoNomeCampo.value = withSpring(12, comBalanco);
      esquerdaNomeCampo.value = withSpring(20, comBalanco);
      corNomeCampo.value = tema.color.fosco;

      heightEnvolvedor.value = withSpring(140, semBalanco);
    }
  }, [valor]);

  return (
    <Animated.View style={[styles.envolvedor, envolvedorAnimacao]}>
      {children}

      <Animated.Text
        // @ts-ignore: Unreachable code error
        onPress={() => entradaTextoRef.current?.focus()}
        style={[styles.nomeCampo, nomeCampoAnimacao]}>
        {nome}
      </Animated.Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  nomeCampo: {
    position: 'absolute',
    fontFamily: tema.fontes.WorkSans,
    fontSize: 20,
  },

  envolvedor: {
    width: '100%',
    justifyContent: 'flex-end',
  },
});

export default AnimacoesEntradaDeDadosArea;
