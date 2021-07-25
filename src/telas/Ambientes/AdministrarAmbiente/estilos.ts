import styled from 'styled-components/native'
import { tema } from '../../../global/estilos/tema'

export const Conteiner = styled.View`
  flex: 1;
  padding: 12px;
  
  background-color: ${tema.color.cinza};
`

export const Envolvedor = styled.ScrollView`
  flex: 1;
  flex-direction: column;
`

export const Foto = styled.Image`
  width: 100%;
  height: 196px;
  border-radius: 10px;
`

export const FotoVaziaEnvolvedor = styled.View`
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 196px;

  border-radius: 10px;  
  
  background-color: ${tema.color.verdeAzulado};
`

export const Divisor = styled.View`
  height: 18px;
`

export const EnvolvedorBotoes = styled.View`
  flex-direction: row;
  justify-content: space-between;
`