import React, {useContext, useEffect} from 'react';
import {StyleSheet} from 'react-native';

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Feather';

import {ContextoTeclado} from '../../../contextos/ContextoTeclado';

import {tema} from '../../../global/estilos/tema';
import {comBalanco, semBalanco} from '../../../utils/Animacoes';
import {width} from '../../../utils/Utils';

const AnimacoesAdministrarMorador: React.FC = () => {
  const {tecladoVisivel} = useContext(ContextoTeclado);

  const fotoLargura = useSharedValue(width / 3);
  const fotoAltura = useSharedValue(width / 3);
  const fotoRaioBorda = useSharedValue(width / 3);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: fotoLargura.value,
      height: fotoAltura.value,
      borderRadius: fotoRaioBorda.value,
    };
  });

  const esconderFoto = () => {
    fotoLargura.value = withSpring(width - 24, semBalanco);
    fotoAltura.value = withSpring(50, semBalanco);
    fotoRaioBorda.value = withSpring(15, comBalanco);
  };

  const mostrarFoto = () => {
    fotoLargura.value = withSpring(width / 3, semBalanco);
    fotoAltura.value = withSpring(width / 3, semBalanco);
    fotoRaioBorda.value = withSpring(width / 3, comBalanco);
  };

  useEffect(() => {
    if (!tecladoVisivel) {
      esconderFoto();
    } else {
      mostrarFoto();
    }
  }, [tecladoVisivel]);

  return (
    <Animated.View style={[animatedStyle, styles.fotoEnvolvedor]}>
      <Icon name="camera" size={24} color={tema.color.azulEscuro} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  fotoEnvolvedor: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: tema.color.verdeAzulado,
  },
});

export default AnimacoesAdministrarMorador;
