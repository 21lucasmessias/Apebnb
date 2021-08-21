import styled from 'styled-components/native';
import {tema} from '../../../global/estilos/tema';

export const Conteiner = styled.View`
  flex: 1;
  padding: 0px 12px;

  background-color: ${tema.color.cinza};
`;

export const Envolvedor = styled.ScrollView`
  flex: 1;
  flex-direction: column;
`;

export const Foto = styled.Image`
  width: 100%;
  height: 196px;
  border-radius: 10px;
`;

export const FotoEnvolvedor = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 196px;

  margin-top: 12px;

  border-radius: 10px;

  background-color: ${tema.color.verdeAzulado};
`;

export const Divisor = styled.View`
  height: 8px;
`;

export const EnvolvedorBotoes = styled.View`
  height: 50px;
  margin-top: 12px;
  margin-bottom: 12px;
`;
