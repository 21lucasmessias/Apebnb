import styled from 'styled-components/native'
import { tema } from '../../global/estilos/tema';
import { width } from '../../utils/Utils';

export const Container = styled.View`
  flex: 1;
  background-color: ${tema.color.cinza};
  padding-bottom: 60px;
`

export const Texto = styled.Text`
  font-family: ${tema.fontes.WorkSans};
  color: ${tema.color.azulEscuro};
  font-size: 22px;
  text-align: center;
  margin-bottom: 12px;
`

export const DiaConteiner = styled.View`
  width: 60px;
  padding-top: 16px;
  align-items: center;
`

export const DivisorDia = styled.View`
  width: ${width-16}px;
  height: 1px;
  background-color: ${tema.color.verdeAzulado};
  position: absolute;
  top : 0px;
  left: 8px;
`

export const TextoDia = styled.Text`
  font-family: ${tema.fontes.WorkSans};
  color: ${tema.color.azulEscuro};
  font-size: 22px;
  text-align: center;
  padding-left: 8px;
`