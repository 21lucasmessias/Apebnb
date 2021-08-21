import styled from 'styled-components/native';
import {tema} from '../../../../global/estilos/tema';
import {width} from '../../../../utils/Utils';

export const Conteiner = styled.View`
  flex: 1;
  padding: 12px;

  background-color: ${tema.color.cinza};
`;

export const Envolvedor = styled.View`
  flex: 1;
  flex-direction: column;
  position: relative;
`;

export const Divisor = styled.View`
  height: 8px;
`;
export const EnvolvedorBotoes = styled.View`
  height: 50px;
  margin-top: 12px;
`;

export const SubTitulo = styled.Text`
  font-family: ${tema.fontes.WorkSans};
  color: ${tema.color.azulEscuro};
  font-size: 22px;
  text-align: center;
  margin-bottom: 12px;
`;

export const Foto = styled.Image`
  width: ${width / 2.5}px;
  height: ${width / 2.5}px;
  border-radius: ${width}px;
`;

export const FotoEnvolvedor = styled.View`
  align-items: center;
  justify-content: center;
  align-self: center;

  width: ${width / 2.5}px;
  height: ${width / 2.5}px;

  margin-top: 12px;

  border-radius: ${width}px;
`;

export const FotoVaziaEnvolvedor = styled.View`
  align-items: center;
  justify-content: center;
  align-self: center;

  width: ${width / 2.5}px;
  height: ${width / 2.5}px;

  margin-top: 12px;

  border-radius: ${width}px;

  background-color: ${tema.color.verdeAzulado};
`;
