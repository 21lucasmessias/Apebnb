import { StackCardInterpolationProps } from "@react-navigation/stack";
import { ToastAndroid } from "react-native";

export const semBouncing = {
  restDisplacementThreshold: 0,
  mass: 0.1
}

export const comBouncing = {
  restDisplacementThreshold: 0,
  mass: 0.4
}

export const forFade = ({ current }: StackCardInterpolationProps) => ({
  cardStyle: {
    opacity: current.progress,
  },
});

export const showToast = (msg: string) => ToastAndroid.showWithGravityAndOffset(
  msg,
  ToastAndroid.SHORT,
  ToastAndroid.BOTTOM,
  0,
  120
)