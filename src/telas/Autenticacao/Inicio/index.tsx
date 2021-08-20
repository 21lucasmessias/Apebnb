import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';

import Background from '../../../assets/Background.png';
import LogoWhite from '../../../assets/LogoWhite.png';
import Botao from '../../../componentes/Botao';
import {RotasAutenticacaoParametrosLista} from '../rotas';

import {
  Envolvedor,
  TopoFundo,
  ImagemLogo,
  ImagemFundo,
  TextoFundo,
  Titulo,
  Descricao,
  EnvolvedorBotoes,
  Divisor,
} from './estilos';

interface iInicio
  extends StackScreenProps<RotasAutenticacaoParametrosLista, 'inicio'> {}

const Inicio: React.FC<iInicio> = ({navigation}) => {
  return (
    <Envolvedor>
      <TopoFundo>
        <ImagemFundo
          resizeMethod="resize"
          resizeMode="stretch"
          source={Background}
        />
        <ImagemLogo source={LogoWhite} />
      </TopoFundo>
      <TextoFundo>
        <Titulo>Junte-se a nós</Titulo>
        <Descricao>A melhor forma de interagir com seu condomínio</Descricao>
      </TextoFundo>
      <EnvolvedorBotoes>
        <Botao
          texto="Entrar"
          aoPressionar={() => {
            navigation.navigate('entrar');
          }}
          tipo="preenchido"
        />
        <Divisor />
        <Botao
          texto="Cadastre-se"
          aoPressionar={() => {
            navigation.navigate('cadastro');
          }}
          tipo="preenchido"
        />
      </EnvolvedorBotoes>
    </Envolvedor>
  );
};

export default Inicio;
