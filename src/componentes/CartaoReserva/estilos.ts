import styled from 'styled-components/native';
import {tema} from '../../global/estilos/tema';

export const Pressionavel = styled.TouchableOpacity`
  height: 90px;
  padding: 10px;
  flex-direction: row;
`;

export const Envolvedor = styled.View`
  flex: 1;
  flex-direction: row;

  border-radius: 15px;

  background-color: ${tema.color.branco};
`;

export const Foto = styled.Image`
  width: 75px;
  border-radius: 50px;
  margin-left: 12px;
`;

export const FotoVaziaEnvolvedor = styled.View`
  width: 75px;
  align-items: center;
  justify-content: center;

  border-radius: 15px;

  background-color: ${tema.color.verdeAzulado};
`;

export const Texto = styled.Text`
  margin-left: 12px;
  font-size: 16px;
  font-family: ${tema.fontes.WorkSans};

  color: ${tema.color.azulEscuro};
`;

export const DetalhesEnvolvedor = styled.View`
  justify-content: center;
`;
