import styled from 'styled-components/native'
import { tema } from '../../global/estilos/tema';

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

type iEnvolvedorEntrada = {
  focado: boolean,
  erro: boolean
}


export const EnvolvedorEntrada = styled.View<iEnvolvedorEntrada>`
  height: 140px;
  width: 100%;

  position: absolute;

  border-radius: 10px;  
  border-width: 1px;
  border-style: solid;
  border-color: ${props => props.focado ? tema.color.azulEscuro : props.erro ? tema.color.magenta : tema.color.verdeAzulado};

  background-color: ${tema.color.branco};
`