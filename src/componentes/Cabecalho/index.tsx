import React, { useState, useContext, useEffect } from 'react'

import { StackHeaderProps } from '@react-navigation/stack'

import { ContextoAutenticacao } from '../../contextos/ContextoAutenticacao'

import Icon from 'react-native-vector-icons/Feather'
import Logo from '../../assets/LogoStack.png'

import { tema } from '../../global/estilos/tema'

import CabecalhoItem, { iCabecalhoItem } from '../CabecalhoItem'

import {
  Conteiner,
  Envolvedor,
  Pressionavel,
  Filler,
  Imagem,
} from './estilos'

interface iCabecalho {
  stackCabecalhoProps?: StackHeaderProps,
  menusAdicionais?: Array<iCabecalhoItem['item']>
}

const Cabecalho: React.FC<iCabecalho> = ({stackCabecalhoProps, menusAdicionais = []}) => {
  const { logout } = useContext(ContextoAutenticacao)
  const [maisOpcoesVisivel, setMaisOpcoesVisivel] = useState(false)
  
  const items: Array<iCabecalhoItem['item']> = [
    ...menusAdicionais,
    {
      nome: 'log-out',
      texto: 'Sair',
      acao: async () => {
        await logout()
      }
    },
  ]

  const handlePressMore = () => {
    setMaisOpcoesVisivel(!maisOpcoesVisivel)
  }

  useEffect(() => {
    const unsubscribeOpen = stackCabecalhoProps!.navigation.addListener('blur', () => {
      setMaisOpcoesVisivel(false)
    })

    return () => unsubscribeOpen()
  }, [])


  return(
    <Conteiner>
      <Envolvedor>
        {!stackCabecalhoProps?.navigation.canGoBack() ? <Filler></Filler> : 
          <Pressionavel onPress={stackCabecalhoProps.navigation.goBack}>
            <Icon name='arrow-left' size={24} color={tema.color.ouro}/>
          </Pressionavel>
        }

        <Imagem source={Logo}/>

        <Pressionavel onPress={handlePressMore}>
          <Icon name='more-vertical' size={24} color={tema.color.ouro}/>
        </Pressionavel>
      </Envolvedor>
      {
        items.map((item, index) => (
          <CabecalhoItem
            item={item}
            index={index}
            visivel={maisOpcoesVisivel}
            lenght={items.length}
            key={`${item.nome}${index}`}
          />
        ))
      }
    </Conteiner>
  )
}



export default Cabecalho