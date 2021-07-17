import styled from 'styled-components/native'
import { tema } from '../../global/estilos/tema'

export const Envolvedor = styled.View`
  flex: 1;

  background-color: ${tema.color.cinza};
`

export const FlatList = styled.FlatList`
`

export const Texto = styled.Text`
  font-family: ${tema.fontes.WorkSans};
  font-size: 16px;
  color: ${tema.color.azulEscuro};
  text-align: center
`

export const Separador = styled.View`
  height: 16px;
  background-color: ${tema.color.cinza};
`

