import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'

import { ActivityIndicator } from 'react-native-paper'

import { ContextoMorador } from '../../contextos/ContextoMorador'
import ContextoAmbientesProvider from '../../contextos/ContextoAmbientes'
import { ContextoAutenticacao } from '../../contextos/ContextoAutenticacao'

import { StackScreenProps } from '@react-navigation/stack'
import { RotasAmbientesParamsList } from './rotas'

import ListaAmbientes from '../../componentes/ListaAmbientes'

import { tema } from '../../global/estilos/tema'
import { height } from '../../utils/Utils'

import BotaoAdicionar from '../../componentes/BotaoAdicionar'

import {
  Envolvedor,
  Titulo,
  SubTitulo,
  NomeView
} from './estilos'

const Ambientes: React.FC<StackScreenProps<RotasAmbientesParamsList, 'ambientes'>> = ({ navigation }) => {
  const { user } = useContext(ContextoAutenticacao)
  const { adicionarListenerNomeMorador } = useContext(ContextoMorador)

  const [nome, setNome] = useState<string | undefined>(undefined)

  const refreshUserNome = (nome: string) => {
    setNome(nome)
  }

  useEffect(() => {
    if(user.uid){
      const removerListener = adicionarListenerNomeMorador(user.uid as string, refreshUserNome)

      return removerListener
    }
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
        
        <ListaAmbientes navigation={navigation}/>
      </Envolvedor>

      { user.isAdmin && (
        <BotaoAdicionar
          tipo='claro'
          style={styles.botaoAdicionar}
          onPress={() => navigation.push('criarAmbiente')}
        />
      ) }
    </ContextoAmbientesProvider>
  )
}

const styles = StyleSheet.create({
  botaoAdicionar: {
    position: 'absolute',
    right: 20,
    top: height - 250
  }
})

export default Ambientes;