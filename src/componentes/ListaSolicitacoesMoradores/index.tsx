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
import { ContextoMoradores } from '../../contextos/ContextoMoradores';
import CartaoSolicitacaoMorador from '../CartaoSolicitacaoMorador';

interface iListaSolicitacoesMoradores {
  navigation: StackNavigationProp<RotasMoradoresParamsList, 'solicitacoes'>
}

const ListaSolicitacoesMoradores: React.FC<iListaSolicitacoesMoradores> = ({ navigation }) => {
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
          <CartaoSolicitacaoMorador
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

export default ListaSolicitacoesMoradores
