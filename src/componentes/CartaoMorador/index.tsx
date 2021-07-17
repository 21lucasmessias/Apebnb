import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { StackNavigationProp } from '@react-navigation/stack'
import React from 'react'

import Icon from 'react-native-vector-icons/Feather'
import { tema } from '../../global/estilos/tema'
import { iMorador } from '../../models/Morador'
import { RotasParamsList } from '../../rotas'
import { RotasAmbientesParamsList } from '../../telas/Ambientes/rotas'

import {
  Envolvedor,
  Foto,
  Texto,
  FotoVaziaEnvolvedor,
  Pressionavel
} from './estilos'

interface iCartaoMorador {
  morador: iMorador,
  navigation: StackNavigationProp<RotasAmbientesParamsList>
}

const CartaoMorador: React.FC<iCartaoMorador> = ({ morador, navigation }) => {
  return (
    <Pressionavel activeOpacity={0.7}>
      <Envolvedor>
        {morador.foto ? (
          <Foto source={{uri: morador.foto}}/>
        ) : (
          <FotoVaziaEnvolvedor>
            <Icon name='camera' size={24} color={tema.color.azulEscuro}/>
          </FotoVaziaEnvolvedor>
        )}
        
        <Texto>{morador.nome}</Texto>
      </Envolvedor>
    </Pressionavel>
  )
}

export default CartaoMorador
