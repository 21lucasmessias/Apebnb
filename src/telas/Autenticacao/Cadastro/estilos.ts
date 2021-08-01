import styled from 'styled-components/native'
import { tema } from '../../../global/estilos/tema'

export const Conteiner = styled.View`
  flex: 1;
  background-color: ${tema.color.cinza};
`

export const Voltar = styled.TouchableOpacity`
  position: absolute;
  width: 24px;
  height: 24px;
  top: 12px;
  left: 12px;
`

export const TextoConteiner = styled.View`
  top: -8px;
`

export const FormEnvolvedor = styled.ScrollView`
  flex: 1;
  height: 100%;
  padding: 0px 32px;
`

export const Descricao = styled.Text`
  font-family: ${tema.fontes.WorkSans};
  font-size: 22px;
  color: ${tema.color.azulEscuro};
  text-align: center;
`

export const EnvolvedorBotoes = styled.View`
  height: 50px;
  margin: 12px 38px;
  justify-content: center;
`

export const Divisor = styled.View`
  height: 12px;
`
