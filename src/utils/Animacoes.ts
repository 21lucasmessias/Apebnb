import {StackCardInterpolationProps} from '@react-navigation/stack';
import {ToastAndroid} from 'react-native';

export const semBalanco = {
  restDisplacementThreshold: 0,
  mass: 0.1,
};

export const comBalanco = {
  restDisplacementThreshold: 0,
  mass: 0.4,
};

export const animacaoDesaparecer = ({
  current,
}: StackCardInterpolationProps) => ({
  cardStyle: {
    opacity: current.progress,
  },
});

export const mostrarAviso = (msg: string, long?: boolean) =>
  ToastAndroid.showWithGravityAndOffset(
    msg,
    long ? ToastAndroid.LONG : ToastAndroid.SHORT,
    ToastAndroid.BOTTOM,
    0,
    120,
  );
