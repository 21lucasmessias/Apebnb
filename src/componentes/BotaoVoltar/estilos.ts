import styled from 'styled-components/native'
import { tema } from '../../global/estilos/tema';

export const Pressionavel = styled.TouchableOpacity`
  height: 50px;
  margin-left: 36px;
  margin-right: 36px;

  border-radius: 10px;

  align-items: center;
  justify-content: center;

  background-color: ${tema.color.cinza};

  border: 1px solid ${tema.color.azulEscuro}
`

export const Texto = styled.Text`
  color: ${tema.color.azulEscuro};
  font-family: 'WorkSans-Regular';
  font-size: 24px;
`;