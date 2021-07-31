import styled from 'styled-components/native'
import { tema } from '../../../global/estilos/tema'
import { height, width } from '../../../utils/Utils';

export const Conteiner = styled.View`
  flex: 1;
  background-color: ${tema.color.cinza};
  justify-content: space-between;
`

export const TopoBackground = styled.View`
  justify-content: center;
`

export const ImagemLogo = styled.Image`
  position: absolute;
  align-self: center;
`

export const ImagemBackground = styled.Image`
  width: ${width}px;
  height: ${height/2.5}px;
`

export const TextoConteiner = styled.View`
  flex: 1;
  align-items: flex-start;
`

export const Titulo = styled.Text`
  font-family: ${tema.fontes.WorkSans};
  font-size: 34px;
  color: ${tema.color.azulEscuro};
  margin-left: 38px;
`

export const Descricao = styled.Text`
  font-family: ${tema.fontes.WorkSans};
  font-size: 22px;
  color: ${tema.color.azulEscuro};
  max-width: ${width/2}px;
  margin-left: 38px;
`

export const EnvolvedorBotoes = styled.View`
  height: 136px;
  margin: 12px 38px;
`

export const Divisor = styled.View`
  height: 12px;
`
