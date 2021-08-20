import styled from 'styled-components/native';
import {tema} from '../../global/estilos/tema';

export const Envolvedor = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const Entrada = styled.TextInput`
  flex: 1;
  height: 50px;

  text-decoration-line: none;

  padding-left: 19px;

  border: 1px solid ${tema.color.azulEscuro};
  border-right-width: 0px;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;

  background-color: ${tema.color.branco};

  font-family: ${tema.fontes.WorkSans};
  font-size: 18px;
  color: ${tema.color.azulEscuro};
`;

export const Pressionavel = styled.TouchableOpacity`
  padding-right: 12px;
  background-color: ${tema.color.branco};
  align-items: center;
  justify-content: center;
  height: 50px;
  border: 1px solid ${tema.color.azulEscuro};
  border-left-width: 0px;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
`;
