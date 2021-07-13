import styled from "styled-components/native"
import { tema } from "../../global/estilos/tema"

export const Pressionavel = styled.TouchableOpacity``;

export const Envolvedor = styled.View`
  flex-direction: row;
  justify-content: space-between;
  
  height: 190px;

  padding: 12px;
  border-radius: 15px;
  
  background-color: ${tema.color.ouro};
`

export const Foto = styled.Image`
  width: 48%;
  height: 166px;
  border-radius: 10px;
`

export const FotoVaziaEnvolvedor = styled.View`
  align-items: center;
  justify-content: center;

  width: 48%;
  height: 166px;

  border-radius: 10px;  
  
  background-color: ${tema.color.verdeAzulado};
`;

export const Separador = styled.View`
  width: 1px;
  height: 100%;

  background-color: ${tema.color.azulEscuro};
`

export const DescricaoEnvolvedor = styled.View`
  width: 48%;
`

export const Titulo = styled.Text`
  text-align: center;
  font-family: ${tema.fontes.WorkSans};
  font-size: 16px;
  color: ${tema.color.azulEscuro};
`

export const Descricao = styled.Text`
  text-align: justify;
  font-family: ${tema.fontes.WorkSans};
  font-size: 10px;
  color: ${tema.color.azulEscuro};
`