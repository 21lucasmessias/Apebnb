import styled from "styled-components/native"
import { tema } from "../../global/estilos/tema"

interface iPressionavel {
  ultimo: boolean
}

export const Pressionavel = styled.TouchableOpacity<iPressionavel>`
  margin-bottom: ${(props) => props.ultimo ? '64px' : '0px'};
`;

export const Envolvedor = styled.View`
  flex-direction: row;
  justify-content: space-between;
  
  height: 190px;

  padding: 12px;
  border-radius: 18px;
  
  background-color: ${tema.color.branco};
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
  overflow: hidden;
`

export const Titulo = styled.Text`
  text-align: center;
  font-family: ${tema.fontes.WorkSans};
  font-size: 18px;
  color: ${tema.color.verdeAzulado};
`

export const Descricao = styled.Text`
  text-align: justify;
  font-family: ${tema.fontes.WorkSans};
  font-size: 12px;
  color: ${tema.color.azulEscuro};
`