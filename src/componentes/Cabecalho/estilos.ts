import styled from 'styled-components/native'
import { tema } from '../../global/estilos/tema';
import { height } from '../../utils/Utils';

export const Conteiner = styled.View`
  flex: 1;
`

export const Envolvedor = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  height: 55px;

  width: 100%;
  padding: 10px;

  background-color: ${tema.color.azulEscuro};
`

export const Filler = styled.View`
  width: 36px;
`

export const Pressionavel = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: center;

  background-color: ${tema.color.azulEscuro};
  width: 36px;
  height: 36px;
  border-radius: 10px;
`

export const Imagem = styled.Image`
`