import React, { useEffect, useState, useContext } from 'react'

import { FlatList } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

import { ContextoMoradores } from '../../contextos/ContextoMoradores';

import { StackNavigationProp } from '@react-navigation/stack';
import { RotasMoradoresParamsList } from '../../telas/Moradores/rotas';

import { tema } from '../../global/estilos/tema';
import { iMorador } from '../../models/Morador';

import BarraPesquisa from '../BarraPesquisa';
import CartaoMorador from '../CartaoMorador';

import {
  Envolvedor,
  Texto,
  Separador
} from './estilos'
import { showToast } from '../../utils/Animacoes';

interface iListaMoradores {
  navigation: StackNavigationProp<RotasMoradoresParamsList, 'moradores'>
}

const ListaMoradores: React.FC<iListaMoradores> = ({ navigation }) => {
  const [carregando, setCarregando] = useState(true)
  const [moradores, setMoradores] = useState<Array<iMorador>>([])
  const [moradoresFiltrados, setMoradoresFiltrados] = useState<Array<iMorador>>([])

  const {
    getAllMoradoresAprovados,
    adicionarAutoRefreshMoradoresAprovados
  } = useContext(ContextoMoradores)

  useEffect(() => {
    const unsubscribe = adicionarAutoRefreshMoradoresAprovados(fetchMoradoresAprovados)

    fetchMoradoresAprovados()

    return unsubscribe
  }, [])

  const fetchMoradoresAprovados = async () => {
    setCarregando(true)

    try {
      const res = await getAllMoradoresAprovados()

      setMoradores(res)
      setMoradoresFiltrados(res)
      
      setCarregando(false)
    } catch(err) {
      showToast("Erro interno. Contate o desenvolvedor.")
      console.log(err)
    }
  }

  return (
    <Envolvedor>
      <BarraPesquisa
        placeholder='Buscar por nome'
        setDadosFiltrados={setMoradoresFiltrados}
        dadosOriginais={moradores}
      />

      { carregando ? (
        <ActivityIndicator size='large' color={tema.color.azulEscuro} />
      ) : (
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
      )}
    </Envolvedor>
  )
}

export default ListaMoradores
