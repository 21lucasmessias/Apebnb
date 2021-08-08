import styled from 'styled-components/native'

import { tema } from '../../global/estilos/tema';

type iEntradaTexto = {
  focado: boolean;
  erro: boolean;
}

export const EntradaTexto = styled.TextInput<iEntradaTexto>`
  flex: 1;

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

type iEnvolvedorEntrada = {
  focado: boolean,
  erro: boolean
}

export const EnvolvedorEntrada = styled.View<iEnvolvedorEntrada>`
  width: 100%;

  flex-direction: row;
  align-items: center;

  position: absolute;
  bottom: 8px;

  border-radius: 15px;  
  border-width: 1px;
  border-style: solid;
  border-color: ${props => props.focado ? tema.color.azulEscuro : props.erro ? tema.color.magenta : tema.color.verdeAzulado};

  background-color: ${tema.color.branco};
`