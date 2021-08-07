import { StackCardInterpolationProps } from "@react-navigation/stack";

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