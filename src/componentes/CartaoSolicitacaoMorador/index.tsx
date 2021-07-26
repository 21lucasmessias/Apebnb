import { StackNavigationProp } from '@react-navigation/stack'
import React, { useContext, useState } from 'react'
import { Keyboard } from 'react-native'

import Icon from 'react-native-vector-icons/Feather'
import { ContextoTeclado } from '../../contextos/ContextoTeclado'
import { tema } from '../../global/estilos/tema'
import { iMorador } from '../../models/Morador'
import { RotasMoradoresParamsList } from '../../telas/Moradores/rotas'

import {
  Envolvedor,
  Foto,
  FotoVaziaEnvolvedor,
  Pressionavel,
  DetalhesEnvolvedor,
  Texto
} from './estilos'

interface iCartaoSolicitacaoMorador {
  morador: iMorador,
  navigation: StackNavigationProp<RotasMoradoresParamsList, 'solicitacoes'>,
  ultimo: boolean
}

const CartaoSolicitacaoMorador: React.FC<iCartaoSolicitacaoMorador> = ({ morador, navigation, ultimo }) => {
  const {
    tecladoVisivel
  } = useContext(ContextoTeclado)

  return (
    <Pressionavel
      activeOpacity={0.7}
      onPress={() => {
        Keyboard.dismiss()
        navigation.navigate( 'aprovarMorador', {
          morador: morador
        })
      }}
      ultimo={ultimo && tecladoVisivel}
    >
      <Envolvedor>
        {morador.foto ? (
          <Foto source={{ uri: morador.foto }} />
        ) : (
          <FotoVaziaEnvolvedor>
            <Icon name='camera' size={24} color={tema.color.azulEscuro} />
          </FotoVaziaEnvolvedor>
        )}

        <DetalhesEnvolvedor>
          <Texto>
            {morador.nome}
          </Texto>
          <Texto>
            {morador.numero}
          </Texto>
        </DetalhesEnvolvedor>
      </Envolvedor>
    </Pressionavel>
  )
}

export default CartaoSolicitacaoMorador
