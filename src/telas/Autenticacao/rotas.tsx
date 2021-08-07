import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import { forFade } from '../../utils/Animacoes';

import Inicio from './Inicio';
import Cadastro from './Cadastro';
import Entrar from './Entrar';
import RecuperarSenha from './RecuperarSenha';

export type RotasAutenticacaoParamsList = {
  inicio: undefined;
  entrar: undefined;
  cadastro: undefined;
  recuperarSenha: undefined;
};

const { Navigator, Screen } = createStackNavigator<RotasAutenticacaoParamsList>();

const RotasAutenticacao: React.FC = () => {
  return (
    <Navigator
      headerMode='none'
      screenOptions={{
        cardStyleInterpolator: (props) => forFade(props)
      }}
    >
      <Screen name="inicio" component={Inicio} />
      <Screen name="cadastro" component={Cadastro} />
      <Screen name="entrar" component={Entrar} />
      <Screen name="recuperarSenha" component={RecuperarSenha} />
    </Navigator>
  );
};

export default RotasAutenticacao;
