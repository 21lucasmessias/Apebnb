import styled from 'styled-components/native'
import { tema } from '../../../../global/estilos/tema'

export const Conteiner = styled.View`
  flex: 1;
  padding: 12px;
  
  background-color: ${tema.color.cinza};
`

export const Envolvedor = styled.View`
  flex: 1;
  flex-direction: column;
  position: relative;
`

export const Divisor = styled.View`
  height: 8px;
`
export const EnvolvedorBotoes = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 12px;
`

export const SubTitulo = styled.Text`
  font-family: ${tema.fontes.WorkSans};
  color: ${tema.color.azulEscuro};
  font-size: 22px;
  text-align: center;
  margin-bottom: 24px;
`