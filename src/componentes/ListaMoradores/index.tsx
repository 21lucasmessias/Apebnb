import React from 'react'

import { StackNavigationProp } from '@react-navigation/stack';

import {
  Envolvedor,
  Texto,
  Separador
} from './estilos'
import { RotasMoradoresParamsList } from '../../telas/Moradores/rotas';
import { useState } from 'react';
import BarraPesquisa from '../BarraPesquisa';
import { useContext } from 'react';
import { FlatList } from 'react-native';
import CartaoMorador from '../CartaoMorador';
import { ContextoMoradores } from '../../contextos/ContextoMoradores';

interface iListaMoradores {
  navigation: StackNavigationProp<RotasMoradoresParamsList, 'moradores'>
}

const ListaMoradores: React.FC<iListaMoradores> = ({ navigation }) => {
  const [buscar, setBuscar] = useState('')
  const {
    moradores,
    setMoradoresFiltrados,
    moradoresFiltrados
  } = useContext(ContextoMoradores)

  return (
    <Envolvedor>
      <BarraPesquisa
        placeholder='Buscar por nome'
        valor={buscar}
        setValor={setBuscar}
        setDadosFiltrados={setMoradoresFiltrados}
        dadosOriginais={moradores}
      />

      <FlatList
        data={moradoresFiltrados}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <CartaoMorador
            morador={item}
            navigation={navigation}
            ultimo={index == moradores.length - 1}
          />
        )}
        ListEmptyComponent={() => <Texto>Sem resultados disponíveis</Texto>}
        ItemSeparatorComponent={() => <Separador></Separador>}

        showsVerticalScrollIndicator={false}
      />
    </Envolvedor>
  )
}

export default ListaMoradores
