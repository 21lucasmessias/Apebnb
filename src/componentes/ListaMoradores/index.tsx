import React, {useEffect, useState, useContext} from 'react';

import {FlatList} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';

import {ContextoMoradores} from '../../contextos/ContextoMoradores';

import {StackNavigationProp} from '@react-navigation/stack';
import {RotasMoradoresParametrosLista} from '../../telas/Moradores/rotas';

import {tema} from '../../global/estilos/tema';
import {iMorador} from '../../models/Morador';

import BarraPesquisa from '../BarraPesquisa';
import CartaoMorador from '../CartaoMorador';

import {Envolvedor, Texto, Separador} from './estilos';
import {mostrarAviso} from '../../utils/Animacoes';

interface iListaMoradores {
  navigation: StackNavigationProp<RotasMoradoresParametrosLista, 'moradores'>;
}

const ListaMoradores: React.FC<iListaMoradores> = ({navigation}) => {
  const [carregando, setCarregando] = useState(true);
  const [moradores, setMoradores] = useState<Array<iMorador>>([]);
  const [moradoresFiltrados, setMoradoresFiltrados] = useState<Array<iMorador>>(
    [],
  );

  const {
    listarTodosMoradoresAprovados,
    adicionarAtualizacaoAutomaticaMoradoresAprovados,
  } = useContext(ContextoMoradores);

  useEffect(() => {
    const removerAtualizacaoAutomaticaMoradores =
      adicionarAtualizacaoAutomaticaMoradoresAprovados(
        atualizarMoradoresAprovados,
      );

    atualizarMoradoresAprovados();

    return removerAtualizacaoAutomaticaMoradores;
  }, []);

  const atualizarMoradoresAprovados = async () => {
    setCarregando(true);

    try {
      const moradoresListados = await listarTodosMoradoresAprovados();

      setMoradores(moradoresListados);
      setMoradoresFiltrados(moradoresListados);

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
      )}
    </Envolvedor>
  );
};

export default ListaMoradores;
