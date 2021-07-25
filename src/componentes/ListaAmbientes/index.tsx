import React from 'react'
import { iAmbiente } from '../../models/Ambiente'
import CartaoAmbiente from '../CartaoAmbiente'

import { StackNavigationProp } from '@react-navigation/stack';

import {
  Envolvedor,
  Texto,
  Separador
} from './estilos'
import { RotasAmbientesParamsList } from '../../telas/Ambientes/rotas';
import { useState } from 'react';
import BarraPesquisa from '../BarraPesquisa';
import { useContext } from 'react';
import { ContextoAmbientes } from '../../contextos/ContextoAmbientes';
import { FlatList } from 'react-native';

interface iListaAmbientes {
  navigation: StackNavigationProp<RotasAmbientesParamsList, 'ambientes'>
}

const ListaAmbientes: React.FC<iListaAmbientes> = ({ navigation }) => {
  const [buscar, setBuscar] = useState('')
  const {
    ambientes,
    setAmbientesFiltrados,
    ambientesFiltrados
  } = useContext(ContextoAmbientes)

  return (
    <Envolvedor>
      <BarraPesquisa
        placeholder='Buscar por nome'
        valor={buscar}
        setValor={setBuscar}
        setDadosFiltrados={setAmbientesFiltrados}
        dadosOriginais={ambientes}
      />

      <FlatList
        data={ambientesFiltrados}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <CartaoAmbiente
            ambiente={item}
            navigation={navigation}
            ultimo={index == ambientes.length - 1}
          />
        )}
        ListEmptyComponent={() => <Texto>Sem resultados disponíveis</Texto>}
        ItemSeparatorComponent={() => <Separador></Separador>}

        showsVerticalScrollIndicator={false}
      />
    </Envolvedor>
  )
}

export default ListaAmbientes
