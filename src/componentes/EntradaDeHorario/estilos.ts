import styled from 'styled-components/native'
import { tema } from '../../global/estilos/tema'

interface iEntrada {
  erro: boolean,
}

export const Envolvedor = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const Entrada = styled.TextInput<iEntrada>`
  flex: 1;
  height: 50px;

  text-decoration-line: none;

  padding-left: 19px;

  border: 1px solid ${props => props.erro ? tema.color.magenta : tema.color.verdeAzulado};
  border-right-width: 0px;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;

  background-color: ${tema.color.branco};

  font-family: ${tema.fontes.WorkSans};
  font-size: 18px;
  color: ${tema.color.azulEscuro};
`

export const Pressionavel = styled.TouchableOpacity<iEntrada>`
  padding-right: 12px;
  background-color: ${tema.color.branco};
  align-items: center;
  justify-content: center;
  height: 50px;
  border: 1px solid ${props => props.erro ? tema.color.magenta : tema.color.verdeAzulado};
  border-left-width: 0px;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
`

export const PressionavelHorario = styled.TouchableOpacity`
  border: 1px solid ${tema.color.azulEscuro};
  border-radius: 10px;
  margin-bottom: 12px;
  background-color: ${tema.color.cinza};
`

export const Texto = styled.Text`
  font-size: 16px;
  font-family: monospace;
  color: ${tema.color.azulEscuro};
  text-align: center;
`