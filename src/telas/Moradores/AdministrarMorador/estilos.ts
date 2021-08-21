import styled from 'styled-components/native';
import {tema} from '../../../global/estilos/tema';
import {width} from '../../../utils/Utils';

export const Envolvedor = styled.View`
  flex: 1;
  padding: 0px 12px;
  background-color: ${tema.color.cinza};
  flex-direction: column;
`;

export const Divisor = styled.View`
  height: 8px;
`;

export const BotaoEnvolvedor = styled.View`
  margin-top: 10px;
  height: 50px;
`;

export const Foto = styled.Image`
  width: ${width / 2.5}px;
  height: ${width / 2.5}px;
  border-radius: ${width}px;
`;

export const FotoEnvolvedor = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  align-self: center;

  width: ${width / 2.5}px;
  height: ${width / 2.5}px;

  margin-top: 12px;

  border-radius: ${width}px;
`;

export const FotoVaziaEnvolvedor = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  align-self: center;

  width: ${width / 2.5}px;
  height: ${width / 2.5}px;

  margin-top: 12px;

  border-radius: ${width}px;

  background-color: ${tema.color.verdeAzulado};
`;
