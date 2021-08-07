import React from 'react'
import { StackScreenProps } from '@react-navigation/stack'

import { RotasMoradoresParamsList } from '../rotas'
import ContextoMoradoresProvider from '../../../contextos/ContextoMoradores'

import ListaMoradores from '../../../componentes/ListaMoradores'

import {
  Envolvedor,
  SubTitulo,
  EnvolvedorBotoes,
  Divisor
} from './estilos'
import Botao from '../../../componentes/Botao'

const Moradores: React.FC<StackScreenProps<RotasMoradoresParamsList, 'moradores'>> = (navigation) => {
  return (
    <ContextoMoradoresProvider>
      <Envolvedor>
        <SubTitulo>Moradores</SubTitulo>

        <EnvolvedorBotoes>
          <Botao
            aoPressionar={() => {navigation.navigation.navigate('solicitacoes')}}
            texto='Solicitações'
            tipo='preenchido'
          />

          <Divisor/>

          <Botao
            aoPressionar={() => {navigation.navigation.navigate('criarMorador')}}
            texto='Inclusão manual'
            tipo='preenchido'
          />
        </EnvolvedorBotoes>

        <ListaMoradores
          navigation={navigation.navigation}
        />
      </Envolvedor>
    </ContextoMoradoresProvider>
  )
}

export default Moradores;