import React, { useContext, useEffect, useState } from 'react'

import { ActivityIndicator } from 'react-native-paper'

import { ContextoMorador } from '../../contextos/ContextoMorador'
import ContextoAmbientesProvider from '../../contextos/ContextoAmbientes'

import { StackScreenProps } from '@react-navigation/stack'
import { RotasAmbientesParamsList } from './rotas'

import ListaAmbientes from '../../componentes/ListaAmbientes'

import { tema } from '../../global/estilos/tema'

import {
  Envolvedor,
  Titulo,
  SubTitulo,
  NomeView
} from './estilos'

const Ambientes: React.FC<StackScreenProps<RotasAmbientesParamsList, 'ambientes'>> = (navigation) => {
  const { adicionarListenerNomeMorador } = useContext(ContextoMorador)

  const [nome, setNome] = useState<string | undefined>(undefined)

  const refreshUserNome = (nome: string) => {
    setNome(nome)
  }

  useEffect(() => {
    const removerListener = adicionarListenerNomeMorador(refreshUserNome)

    return removerListener
  }, [])

  return (
    <ContextoAmbientesProvider>
      <Envolvedor>
        <NomeView>
          <Titulo>
            Olá
          </Titulo>

          {nome === undefined ? (
            <ActivityIndicator size='small' color={tema.color.azulEscuro}/>
          ) : (
            <Titulo>
              {nome}
            </Titulo>
          )}
        </NomeView>
        <SubTitulo>Ambientes</SubTitulo>
        <ListaAmbientes
          navigation={navigation.navigation}
        />
      </Envolvedor>
    </ContextoAmbientesProvider>
  )
}

export default Ambientes;