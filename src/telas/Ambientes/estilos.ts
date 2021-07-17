import styled from 'styled-components/native'
import { tema } from '../../global/estilos/tema';

export const Envolvedor = styled.View`
  flex: 1;

  overflow: hidden;
  background-color: ${tema.color.cinza};

  padding-right: 16px;
  padding-left: 16px;
`

export const Corpo = styled.View`
  flex: 1;
`

export const Titulo = styled.Text`
  font-family: ${tema.fontes.WorkSans};
  color: ${tema.color.azulEscuro};
  font-size: 32px;
  margin-top: 6px;
  margin-bottom: 12px;
`

export const SubTitulo = styled.Text`
  font-family: ${tema.fontes.WorkSans};
  color: ${tema.color.azulEscuro};
  font-size: 22px;
  text-align: center;
  margin-bottom: 12px;
`