import styled from "styled-components/native";
import { tema } from "../../global/estilos/tema";

type iEnvolvedor = {
  tipo: 'claro' | 'escuro'
}

export const Envolvedor = styled.View<iEnvolvedor>`
  width: 50px;
  height: 50px;

  border-radius: 10px;

  border: 1px solid ${props => props.tipo == 'claro' ? 'transparent' : tema.color.azulEscuro};
  background-color: ${props => props.tipo == 'claro' ? tema.color.verdeAzulado : 'transparent'};

  justify-content: center;
  align-items: center;
`;

export const Pressionavel = styled.TouchableOpacity``;