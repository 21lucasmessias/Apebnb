import React, { useContext } from 'react'
import { FlatList } from 'react-native';

import { StackNavigationProp } from '@react-navigation/stack';
import { RotasAmbientesParamsList } from '../../telas/Ambientes/rotas';

import { ContextoAmbientes } from '../../contextos/ContextoAmbientes';

import CartaoAmbiente from '../CartaoAmbiente'
import BarraPesquisa from '../BarraPesquisa';

import {
  Envolvedor,
  Texto,
  Separador
} from './estilos'

interface iListaAmbientes {
  navigation: StackNavigationProp<RotasAmbientesParamsList, 'ambientes'>
}

const ListaAmbientes: React.FC<iListaAmbientes> = ({ navigation }) => {
  const {
    ambientes,
    setAmbientesFiltrados,
    ambientesFiltrados
  } = useContext(ContextoAmbientes)

  return (
    <Envolvedor>
      <BarraPesquisa
        placeholder='Buscar por nome'
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
