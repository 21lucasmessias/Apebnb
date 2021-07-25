import styled from 'styled-components/native'
import { tema } from '../../global/estilos/tema'

export const Titulo = styled.Text`
  font-size: 24px;
  font-family: ${tema.fontes.WorkSans};;
  color: ${tema.color.azulEscuro};
  text-align: center;

  margin-bottom: 12px;
`

export const Pressionavel = styled.TouchableOpacity`
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