import styled from 'styled-components/native'
import { tema } from '../../global/estilos/tema';

type iPressionavel = {
  tipo: 'preenchido' | 'wireframe'
}

export const Pressionavel = styled.TouchableOpacity<iPressionavel>`
  flex: 1;
  height: 50px;

  border-radius: 10px;

  align-items: center;
  justify-content: center;

  border: ${props => props.tipo === 'preenchido' ? '0px' : '1px solid ' + tema.color.azulEscuro };
  background-color: ${props => props.tipo === 'preenchido' ? tema.color.azulEscuro : tema.color.cinza};
`

type iTexto = {
  tipo: 'preenchido' | 'wireframe'
}

export const Texto = styled.Text<iTexto>`
  color: ${props => props.tipo === 'preenchido' ? tema.color.ouro : tema.color.azulEscuro };
  font-family: 'WorkSans-Regular';
  font-size: 18px;
`;