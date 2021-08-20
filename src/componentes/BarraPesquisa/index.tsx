import React, {useState} from 'react';
import {TextInputProps} from 'react-native';

import Icon from 'react-native-vector-icons/Feather';

import {tema} from '../../global/estilos/tema';
import {iAmbiente} from '../../models/Ambiente';
import {iMorador} from '../../models/Morador';

import {Envolvedor, EntradaTexto} from './estilos';

interface iBarraPesquisa extends TextInputProps {
  dadosOriginais: Array<iAmbiente | iMorador>;
  setDadosFiltrados: React.Dispatch<React.SetStateAction<Array<any>>>;
}

const BarraPesquisa: React.FC<iBarraPesquisa> = ({
  dadosOriginais,
  setDadosFiltrados,
  ...rest
}) => {
  const [buscar, setBuscar] = useState('');

  const filtrarDados = (texto: string) => {
    setBuscar(texto);

    if (texto) {
      let novosDados = dadosOriginais.filter(item => {
        let itemNome = item.nome.toUpperCase();
        let textoNome = texto.toUpperCase();

        return itemNome.indexOf(textoNome) > -1;
      });

      setDadosFiltrados(novosDados);
    } else {
      setDadosFiltrados([...dadosOriginais]);
    }
  };

  return (
    <Envolvedor>
      <EntradaTexto value={buscar} onChangeText={filtrarDados} {...rest} />

      <Icon
        name="search"
        size={24}
        color={tema.color.azulEscuro}
        style={{position: 'absolute', left: 16}}
      />
    </Envolvedor>
  );
};

export default BarraPesquisa;
