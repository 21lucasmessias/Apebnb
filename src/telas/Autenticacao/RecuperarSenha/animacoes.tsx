import React, {useContext, useEffect} from 'react';

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import Background from '../../../assets/Background.png';
import LogoWhite from '../../../assets/LogoWhite.png';

import {ContextoTeclado} from '../../../contextos/ContextoTeclado';
import {semBalanco} from '../../../utils/Animacoes';
import {height, width} from '../../../utils/Utils';

export const HeaderAnimacoes: React.FC = () => {
  const {tecladoVisivel} = useContext(ContextoTeclado);

  const fundoEnvolvedorAltura = useSharedValue(height / 4);
  const fundoEnvolvedorAnimacao = useAnimatedStyle(() => {
    return {
      height: fundoEnvolvedorAltura.value,
    };
  });

  const fundoTopo = useSharedValue(0);
  const fundoAnimacao = useAnimatedStyle(() => {
    return {
      top: fundoTopo.value,
    };
  });

  const logoAltura = useSharedValue(71);
  const logoLargura = useSharedValue(220);
  const logoEsquerda = useSharedValue(width / 4);
  const logoTopo = useSharedValue(height / 16);
  const logoAnimacao = useAnimatedStyle(() => {
    return {
      height: logoAltura.value,
      width: logoLargura.value,
      right: logoEsquerda.value,
      top: logoTopo.value,
    };
  });

  const mostrarFundo = () => {
    fundoEnvolvedorAltura.value = withSpring(height / 4, semBalanco);

    fundoTopo.value = withSpring(0, semBalanco);

    logoAltura.value = withSpring(71, semBalanco);
    logoLargura.value = withSpring(220, semBalanco);
    logoEsquerda.value = withSpring(width / 4, semBalanco);
    logoTopo.value = withSpring(height / 16, semBalanco);
  };

  const esconderFundo = () => {
    fundoEnvolvedorAltura.value = withSpring(80, semBalanco);

    fundoTopo.value = withSpring(-50, semBalanco);

    logoAltura.value = withSpring(30, semBalanco);
    logoLargura.value = withSpring(100, semBalanco);
    logoEsquerda.value = withSpring(width / 4, semBalanco);
    logoTopo.value = withSpring(8, semBalanco);
  };

  useEffect(() => {
    if (!tecladoVisivel) {
      esconderFundo();
    } else {
      mostrarFundo();
    }
  }, [tecladoVisivel]);

  return (
    <Animated.View
      style={[
        {
          justifyContent: 'center',
        },
        fundoEnvolvedorAnimacao,
      ]}>
      <Animated.Image
        resizeMethod="resize"
        resizeMode="stretch"
        source={Background}
        style={[
          {
            width: width,
            height: height / 4,
          },
          fundoAnimacao,
        ]}
      />
      <Animated.Image
        source={LogoWhite}
        resizeMethod="resize"
        style={[
          {
            position: 'absolute',
            alignSelf: 'center',
          },
          logoAnimacao,
        ]}
      />
    </Animated.View>
  );
};
