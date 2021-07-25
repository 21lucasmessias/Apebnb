import styled from 'styled-components/native'
import { tema } from '../../global/estilos/tema'

export const Envolvedor = styled.View`
  flex-direction: row;
  width: 100%;
  height: 40px;
`

type iPressionavel = {
  selecionado: boolean
}

export const Pressionavel = styled.TouchableOpacity<iPressionavel>`
  flex: 1;
  justify-content: center;
  border-radius: 5px;
  margin: 2px;
  background-color: ${props => props.selecionado ? tema.color.verdeAzulado : tema.color.magenta};
`

export const Texto = styled.Text`
  font-size: 18px;
  font-family: ${tema.fontes.WorkSans};
  color: ${tema.color.azulEscuro};
  text-align: center;
`