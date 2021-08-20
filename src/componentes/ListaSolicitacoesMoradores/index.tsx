import React, {useEffect, useContext, useState} from 'react';
import {FlatList} from 'react-native';

import {ActivityIndicator} from 'react-native-paper';

import {StackNavigationProp} from '@react-navigation/stack';
import {RotasMoradoresParametrosLista} from '../../telas/Moradores/rotas';

import {ContextoMoradores} from '../../contextos/ContextoMoradores';

import {iMorador} from '../../models/Morador';
import {tema} from '../../global/estilos/tema';

import BarraPesquisa from '../BarraPesquisa';
import CartaoSolicitacaoMorador from '../CartaoSolicitacaoMorador';

import {Envolvedor, Texto, Separador} from './estilos';
import {mostrarAviso} from '../../utils/Animacoes';

interface iListaSolicitacoesMoradores {
  navigation: StackNavigationProp<
    RotasMoradoresParametrosLista,
    'solicitacoes'
  >;
}

const ListaSolicitacoesMoradores: React.FC<iListaSolicitacoesMoradores> = ({
  navigation,
}) => {
  const [carregando, setCarregando] = useState(true);
  const [moradores, setMoradores] = useState<Array<iMorador>>([]);
  const [moradoresFiltrados, setMoradoresFiltrados] = useState<Array<iMorador>>(
    [],
  );

  const {
    listarTodosMoradoresDesaprovados,
    adicionarAtualizacaoAutomaticaMoradoresReprovados,
  } = useContext(ContextoMoradores);

  useEffect(() => {
    const removerAtualizacaoAutomaticaMoradores =
      adicionarAtualizacaoAutomaticaMoradoresReprovados(
        fetchMoradoresReprovados,
      );

    fetchMoradoresReprovados();

    return removerAtualizacaoAutomaticaMoradores;
  }, []);

  const fetchMoradoresReprovados = async () => {
    setCarregando(true);

    try {
      const res = await listarTodosMoradoresDesaprovados();

      setMoradores(res);
      setMoradoresFiltrados(res);
      setCarregando(false);
    } catch (err) {
      mostrarAviso('Erro interno. Contate o desenvolvedor.');
      console.log(err);
    }
  };

  return (
    <Envolvedor>
      <BarraPesquisa
        placeholder="Buscar por nome"
        setDadosFiltrados={setMoradoresFiltrados}
        dadosOriginais={moradores}
      />

      {carregando ? (
        <ActivityIndicator size="large" color={tema.color.azulEscuro} />
      ) : (
        <FlatList
          data={moradoresFiltrados}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({item, index}) => (
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
      )}
    </Envolvedor>
  );
};

export default ListaSolicitacoesMoradores;
