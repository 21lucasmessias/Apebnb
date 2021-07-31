import styled from 'styled-components/native'
import { tema } from '../../../global/estilos/tema'
import { height } from '../../../utils/Utils'

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
`

export const FormEnvolvedor = styled.View`
  flex: 1;
  padding: 32px 32px;
`

export const Descricao = styled.Text`
  font-family: ${tema.fontes.WorkSans};
  font-size: 22px;
  color: ${tema.color.azulEscuro};
  text-align: center;
`

export const EnvolvedorBotoes = styled.View`
  margin: 12px 38px;
  justify-content: center;
`

export const EsqueceuSenha = styled.TouchableOpacity`
`

export const TextoSenha = styled.Text`
  font-family: ${tema.fontes.WorkSans};
  font-size: 14px;
  color: ${tema.color.azulEscuro};
  text-align: right;
`