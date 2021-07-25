import React from 'react'

import { StackNavigationProp } from '@react-navigation/stack'
import { RotasAmbientesParamsList } from '../../telas/Ambientes/rotas'

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
import { useContext } from 'react'
import { ContextoTeclado } from '../../contextos/ContextoTeclado'
import { Keyboard } from 'react-native'

interface iCartaoAmbiente {
  ambiente: iAmbiente,
  navigation: StackNavigationProp<RotasAmbientesParamsList, 'ambientes'>,
  ultimo: boolean
}

const CartaoAmbiente: React.FC<iCartaoAmbiente> = ({ ambiente, navigation, ultimo }) => {
  const {
    tecladoVisivel
  } = useContext(ContextoTeclado)

  return (
    <Pressionavel
      activeOpacity={0.7}
      onPress={() => {
        Keyboard.dismiss()
        navigation.navigate('ambiente', {
          ambiente: ambiente
        })
      }}
      ultimo={ultimo && tecladoVisivel}
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
