import React, {useContext, useEffect, useState} from 'react';

import {FlatList} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';

import {StackNavigationProp} from '@react-navigation/stack';
import {RotasAmbientesParamsList} from '../../telas/Ambientes/rotas';

import {ContextoAmbientes} from '../../contextos/ContextoAmbientes';

import {iAmbiente} from '../../models/Ambiente';
import {tema} from '../../global/estilos/tema';

import CartaoAmbiente from '../CartaoAmbiente';
import BarraPesquisa from '../BarraPesquisa';

import {Envolvedor, Texto, Separador} from './estilos';

interface iListaAmbientes {
  navigation: StackNavigationProp<RotasAmbientesParamsList, 'ambientes'>;
}

const ListaAmbientes: React.FC<iListaAmbientes> = ({navigation}) => {
  const [carregando, setCarregando] = useState(true);
  const [ambientes, setAmbientes] = useState<Array<iAmbiente>>([]);
  const [ambientesFiltrados, setAmbientesFiltrados] = useState<
    Array<iAmbiente>
  >([]);

  const {adicionarAtualizacaoAutomaticaAmbientes, listarTodosAmbientes} =
    useContext(ContextoAmbientes);

  useEffect(() => {
    const removerAtualizacaoAutomaticaAmbientes =
      adicionarAtualizacaoAutomaticaAmbientes(atualizarAmbientes);

    atualizarAmbientes();

    return removerAtualizacaoAutomaticaAmbientes;
  }, []);

  const atualizarAmbientes = async () => {
    setCarregando(true);

    try {
      const ambientesListados = await listarTodosAmbientes();

      setAmbientes(ambientesListados);
      setAmbientesFiltrados(ambientesListados);

      setCarregando(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Envolvedor>
      <BarraPesquisa
        placeholder="Buscar por nome"
        setDadosFiltrados={setAmbientesFiltrados}
        dadosOriginais={ambientes}
      />

      {carregando ? (
        <ActivityIndicator size="large" color={tema.color.azulEscuro} />
      ) : (
        <FlatList
          data={ambientesFiltrados}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({item, index}) => (
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
      )}
    </Envolvedor>
  );
};

export default ListaAmbientes;
