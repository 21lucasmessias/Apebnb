import styled from 'styled-components/native'
import { tema } from '../../global/estilos/tema';
import { width } from '../../utils/Utils';

type iEntradaTexto = {
  focado: boolean;
  erro: boolean;
}

export const EntradaTexto = styled.TextInput<iEntradaTexto>`
  flex: 1;
  text-decoration-line: none;

  padding-left: 20px;
  padding-right: ${(props) => props.autoCompleteType == 'password' ? '60px' : '20px'};


  font-family: ${tema.fontes.WorkSans};
  font-size: 22px;
  color: ${tema.color.azulEscuro};
`

export const Texto = styled.Text`
  font-family: ${tema.fontes.WorkSans};
  font-size: 20px;
`