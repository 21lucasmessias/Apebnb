import React from 'react'
import { TextInputProps } from 'react-native'

import Icon from 'react-native-vector-icons/Feather'
import { tema } from '../../global/estilos/tema'
import { iAmbiente } from '../../models/Ambiente'
import { iMorador } from '../../models/Morador'

import {
  Envolvedor,
  EntradaTexto
} from './estilos'

interface iBarraPesquisa extends TextInputProps {
  valor: string,
  setValor: React.Dispatch<React.SetStateAction<string>>,
  dadosOriginais: Array<iAmbiente | iMorador>,
  setDadosFiltrados: React.Dispatch<React.SetStateAction<Array<any>>>,
}

const BarraPesquisa: React.FC<iBarraPesquisa> = (({ valor, setValor, dadosOriginais, setDadosFiltrados, ...rest }) => {
  const filtrarDados = (text: string) => {
    setValor(text);

    if (text) {
      let novosDados = dadosOriginais.filter((item) => {
        let itemName = item.nome.toUpperCase()
        let textName = text.toUpperCase()

        return itemName.indexOf(textName) > -1
      })

      setDadosFiltrados(novosDados)
    } else {
      setDadosFiltrados([...dadosOriginais])
    }
  }

  return (
    <Envolvedor>
      <EntradaTexto
        value={valor}
        onChangeText={filtrarDados}
        {...rest}
      />

      <Icon name='search' size={24} color={tema.color.azulEscuro} style={{ position: 'absolute', left: 16 }} />
    </Envolvedor>
  )
})

export default BarraPesquisa