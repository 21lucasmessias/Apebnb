import React from 'react'

import Icon from 'react-native-vector-icons/Feather'

import { tema } from '../../global/estilos/tema'
import { iAmbiente } from '../../models/Ambiente'

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

import { StackNavigationProp } from '@react-navigation/stack'
import { RotasAmbientesParamsList } from '../../telas/Ambientes/rotas'

interface iCartaoAmbiente {
  ambiente: iAmbiente,
  navigation: StackNavigationProp<RotasAmbientesParamsList>,
  ultimo: boolean
}

const CartaoAmbiente: React.FC<iCartaoAmbiente> = ({ ambiente, navigation, ultimo }) => {
  return (
    <Pressionavel
      activeOpacity={0.7}
      onPress={() => {
        navigation.navigate('ambiente', {
          ambiente: ambiente
        })
      }}
      ultimo={ultimo}
    >
      <Envolvedor>
        {ambiente.foto ? (
          <Foto source={{ uri: ambiente.foto }} />
        ) : (
          <FotoVaziaEnvolvedor>
            <Icon name='camera' size={24} color={tema.color.azulEscuro} />
          </FotoVaziaEnvolvedor>
        )}

        <Separador></Separador>

        <DescricaoEnvolvedor>
          <Titulo>{ambiente.nome}</Titulo>
          <Descricao>{ambiente.descricao}</Descricao>
        </DescricaoEnvolvedor>
      </Envolvedor>
    </Pressionavel>
  )
}

export default CartaoAmbiente
