import styled from "styled-components/native";

import { tema } from "../../global/estilos/tema";

interface iPressionavel {
  ultimo: boolean
}

export const Pressionavel = styled.TouchableOpacity<iPressionavel>`
  margin-bottom: ${(props) => props.ultimo ? '18px' : '0px'};
`;

export const Envolvedor = styled.View`
  flex-direction: row;
  
  height: 78px;
  width: 100%;

  align-items: center;

  padding: 4px;
  padding-left: 12px;
  padding-right: 12px;
  border-radius: 15px;
    
  background-color: ${tema.color.branco};
`;

export const Foto = styled.Image`
  width: 70px;
  height: 70px;
  
  border-radius: 50px;
`;

export const FotoVaziaEnvolvedor = styled.View`
  width: 70px;
  height: 70px;

  align-items: center;
  justify-content: center;

  border-radius: 50px;  
  
  background-color: ${tema.color.verdeAzulado};
`;

export const Texto = styled.Text`
  margin-left: 12px;
  font-size: 16px;
  font-family: ${tema.fontes.WorkSans};
  
  color: ${tema.color.azulEscuro};
`

export const DetalhesEnvolvedor = styled.View`
  width: 48%;
  overflow: hidden;
`