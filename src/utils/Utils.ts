import { Dimensions } from 'react-native';

export const { width, height } = Dimensions.get("screen");

export const padNumero = (number: number) => {
  let numeroString = number.toString()
  if(numeroString.length == 1) {
    numeroString = numeroString.padStart(2, '0')
  }
  return numeroString
}