import styled from 'styled-components/native'
import { tema } from '../../global/estilos/tema'

export const Pressionavel = styled.TouchableOpacity`
  flex: 1;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
`

export const Texto = styled.Text`
  flex: 1%;
  font-family: ${tema.fontes.WorkSans};
  font-size: 18;
  color: ${tema.color.ouro};
  padding-left: 12;
`