import styled from 'styled-components/native';
import {tema} from '../../../global/estilos/tema';

export const Conteiner = styled.View`
  flex: 1;
  padding: 16px;

  background-color: ${tema.color.cinza};
`;

export const Envolvedor = styled.ScrollView`
  flex: 1;
  flex-direction: column;
  position: relative;
`;

export const Foto = styled.Image`
  width: 100%;
  height: 196px;
  border-radius: 10px;
`;

export const FotoVaziaEnvolvedor = styled.View`
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 196px;

  border-radius: 10px;

  background-color: ${tema.color.verdeAzulado};
`;

export const Divisor = styled.View`
  height: 18px;
  width: 18px;
`;

export const DivisorVisivel = styled.View`
  height: 1px;
  margin: 18px 0px;
  background-color: ${tema.color.azulEscuro};
`;

export const EnvolvedorBotoes = styled.View`
  height: 50px;
  margin-top: 12px;
`;

export const Titulo = styled.Text`
  font-family: ${tema.fontes.WorkSans};
  font-size: 34px;
  color: ${tema.color.azulEscuro};
`;

export const Descricao = styled.Text`
  font-family: ${tema.fontes.WorkSans};
  font-size: 16px;
  color: ${tema.color.azulEscuro};
  text-align: justify;
`;

export const EnvolvedorData = styled.View`
  flex: 1;
  flex-direction: row;
`;
