import { StackNavigationProp } from '@react-navigation/stack'
import React from 'react'
import { iReserva } from '../../models/Reserva'
import { RotasReservasParamsList } from '../../telas/Reservas/rotas'
import Icon from 'react-native-vector-icons/Feather'

import {
  DetalhesEnvolvedor,
  Envolvedor,
  Foto,
  FotoVaziaEnvolvedor,
  Pressionavel,
  Texto
} from './estilos'
import { tema } from '../../global/estilos/tema'

interface iCartaoReserva {
  reserva: iReserva,
  navigation: StackNavigationProp<RotasReservasParamsList, 'reservas'>
}

const CartaoReserva: React.FC<iCartaoReserva> = ({ reserva, navigation }) => {

  const pressHandler = () => {
    navigation.push('visualizarReserva', { reserva })
  }

  return (
    <Pressionavel
      activeOpacity={0.7}
      onPress={pressHandler}
    >
      <Envolvedor>
        {false ? (
          <Foto source={{ uri: 'morador.foto' }} />
        ) : (
          <FotoVaziaEnvolvedor>
            <Icon name='camera' size={24} color={tema.color.azulEscuro} />
          </FotoVaziaEnvolvedor>
        )}

        <DetalhesEnvolvedor>
          <Texto>
            {reserva.horario}
          </Texto>
          <Texto>
            {reserva.idAmbiente}
          </Texto>
        </DetalhesEnvolvedor>
      </Envolvedor>
    </Pressionavel>
  )
}

export default CartaoReserva