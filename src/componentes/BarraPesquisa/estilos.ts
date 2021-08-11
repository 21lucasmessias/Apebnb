import styled from 'styled-components/native'
import { tema } from '../../global/estilos/tema';

export const Envolvedor = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  margin-bottom: 16px;
`;

export const EntradaTexto = styled.TextInput`
  flex: 1;
  height: 45px;

  padding-left: 52px;
  padding-right: 16px;

  border: 1px solid ${tema.color.azulEscuro};
  border-radius: 25px;

  font-family: ${tema.fontes.WorkSans};
  font-size: 18px;
  color: ${tema.color.azulEscuro};

  background-color: ${tema.color.branco};
`