import {StackNavigationProp} from '@react-navigation/stack';
import React, {useContext} from 'react';
import {Keyboard} from 'react-native';

import Icon from 'react-native-vector-icons/Feather';
import {ContextoTeclado} from '../../contextos/ContextoTeclado';
import {tema} from '../../global/estilos/tema';
import {iMorador} from '../../models/Morador';
import {RotasMoradoresParametrosLista} from '../../telas/Moradores/rotas';

import {
  Envolvedor,
  Foto,
  FotoVaziaEnvolvedor,
  Pressionavel,
  DetalhesEnvolvedor,
  Texto,
} from './estilos';

interface iCartaoMorador {
  morador: iMorador;
  navigation: StackNavigationProp<RotasMoradoresParametrosLista, 'moradores'>;
  ultimo: boolean;
}

const CartaoMorador: React.FC<iCartaoMorador> = ({
  morador,
  navigation,
  ultimo,
}) => {
  const {tecladoVisivel} = useContext(ContextoTeclado);

  return (
    <Pressionavel
      activeOpacity={0.7}
      onPress={() => {
        Keyboard.dismiss();
        navigation.navigate('administrarMorador', {
          morador: morador,
        });
      }}
      ultimo={ultimo && tecladoVisivel}>
      <Envolvedor>
        {morador.foto ? (
          <Foto source={{uri: morador.foto}} />
        ) : (
          <FotoVaziaEnvolvedor>
            <Icon name="camera" size={24} color={tema.color.azulEscuro} />
          </FotoVaziaEnvolvedor>
        )}

        <DetalhesEnvolvedor>
          <Texto>{morador.nome}</Texto>
        </DetalhesEnvolvedor>
      </Envolvedor>
    </Pressionavel>
  );
};

export default CartaoMorador;
