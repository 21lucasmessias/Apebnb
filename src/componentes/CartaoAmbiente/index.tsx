import React from 'react'

import Icon from 'react-native-vector-icons/Feather'

import { tema } from '../../global/estilos/tema'
import { iAmbiente } from '../../models/Ambiente'

import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { RotasParamsList } from '../../rotas'

import {
  Pressionavel,
  Envolvedor,
  Foto,
  FotoVaziaEnvolvedor,
  DescricaoEnvolvedor,
  Titulo,
  Descricao,
  Separador
} from './estilos'

interface iCartaoAmbiente {
  ambiente: iAmbiente,
  navigation: BottomTabNavigationProp<RotasParamsList>
}

const CartaoAmbiente: React.FC<iCartaoAmbiente> = ({ ambiente, navigation }) => {
  return (
    <Pressionavel activeOpacity={0.7} onPress={() => {}}>
      <Envolvedor>
        {ambiente.foto ? (
          <Foto source={{uri: ambiente.foto}}/>
        ) : (
          <FotoVaziaEnvolvedor>
            <Icon name='camera' size={24} color={tema.color.azulEscuro}/>
          </FotoVaziaEnvolvedor>
        )}

        <Separador></Separador>

        <DescricaoEnvolvedor>
          <Titulo>{ambiente.titulo}</Titulo>
          <Descricao>{ambiente.descricao}</Descricao>
        </DescricaoEnvolvedor>
      </Envolvedor>
    </Pressionavel>
  )
}

export default CartaoAmbiente
