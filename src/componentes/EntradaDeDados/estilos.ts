import styled from 'styled-components/native'
import { tema } from '../../global/estilos/tema';

type iEntradaTexto = {
  focado: boolean;
  erro: boolean;
}

export const Envolvedor = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding-left: 36px;
  padding-right: 36px;
`;

export const EntradaTexto = styled.TextInput<iEntradaTexto>`
  flex: 1;
  height: 50px;

  text-decoration-line: none;

  padding-left: 19px;
  padding-right: ${(props) => props.autoCompleteType == 'password' ? '60px' : '19px'};

  border: 1px solid ${(props) => props.focado ? tema.color.azulEscuro : props.erro ? 'red' : tema.color.verdeAzulado};
  border-radius: 10px;

  background-color: ${tema.color.branco};

  font-family: ${tema.fontes.WorkSans};
  font-size: 22px;
  color: ${tema.color.azulEscuro};
`