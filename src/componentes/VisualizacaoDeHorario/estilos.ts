import styled from 'styled-components/native'
import { tema } from '../../global/estilos/tema'
import { width } from '../../utils/Utils';

export const Envolvedor = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const HorarioEnvolvedor = styled.View`
  flex: 1;
  height: 50px;

  padding-left: 19px;

  border: 1px solid ${tema.color.verdeAzulado};
  border-right-width: 0px;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;

  background-color: ${tema.color.branco};
  
  justify-content: center;
`

export const Horario = styled.Text`
  text-decoration-line: none;

  font-family: ${tema.fontes.WorkSans};
  font-size: ${width * 0.04}px;
  color: ${tema.color.azulEscuro};
`

export const IconEnvolvedor = styled.View`
  padding-right: 12px;
  background-color: ${tema.color.branco};
  align-items: center;
  justify-content: center;
  height: 50px;
  border: 1px solid ${tema.color.verdeAzulado};
  border-left-width: 0px;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
`