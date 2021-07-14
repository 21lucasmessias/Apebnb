import styled from "styled-components/native";
import { tema } from "../../global/estilos/tema";

export const Pressionavel = styled.TouchableOpacity``;

export const Envolvedor = styled.View`
  flex-direction: row;
  
  height: 58px;
  width: 100%;

  padding: 4px;
  padding-left: 12px;
  padding-right: 12px;
  border-radius: 15px;
    
  background-color: ${tema.color.ouro};
`;

export const Foto = styled.Image`
  width: 50px;
  height: 50px;
  
  border-radius: 50px;
`;

export const FotoVaziaEnvolvedor = styled.View`
  width: 50px;
  height: 50px;

  align-items: center;
  justify-content: center;

  width: 50px;
  height: 50px;

  border-radius: 50px;  
  
  background-color: ${tema.color.verdeAzulado};
`;


export const Texto = styled.Text`
  margin-left: 12px;
  font-size: 16px;
  font-family: ${tema.fontes.WorkSans};
  
  color: ${tema.color.azulEscuro}
`