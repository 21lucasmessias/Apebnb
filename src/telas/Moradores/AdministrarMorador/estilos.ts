import styled from 'styled-components/native'
import { tema } from '../../../global/estilos/tema'

export const Envolvedor = styled.View`
  flex: 1;
  padding: 12px;
  background-color: ${tema.color.cinza};
  flex-direction: column;
`

export const Foto = styled.Image`
  width: 100%;
  height: 196px;
  border-radius: 50px;
`

export const Divisor = styled.View`
  height: 8px;
`

export const BotaoConteiner = styled.View`
  margin-top: 10px;
  height: 50px;
`