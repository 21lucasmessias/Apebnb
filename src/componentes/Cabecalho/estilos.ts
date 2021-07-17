import styled from 'styled-components/native'
import { tema } from '../../global/estilos/tema';

export const Envolvedor = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  height: 56px;
  padding: 10px;

  background-color: ${tema.color.cinza};
`

export const Filler = styled.View`
  width: 36px;
`

export const Pressionavel = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;

  background-color: ${tema.color.azulEscuro};
  width: 36px;
  height: 36px;
  border-radius: 10px;
`

export const Imagem = styled.Image`

`