import { StackScreenProps } from '@react-navigation/stack'
import React from 'react'

import Background from '../../../assets/Background.png'
import LogoWhite from '../../../assets/LogoWhite.png'
import Botao from '../../../componentes/Botao'
import { RotasAutenticacaoParamsList } from '../rotas'

import {
  Conteiner,
  TopoBackground,
  ImagemLogo,
  ImagemBackground,
  TextoConteiner,
  Titulo,
  Descricao,
  EnvolvedorBotoes,
  Divisor
} from './estilos'

interface iInicioScreen extends StackScreenProps<RotasAutenticacaoParamsList, 'inicio'> {}

const Inicio: React.FC<iInicioScreen> = ({navigation}) => {
  return (
    <Conteiner>
      <TopoBackground>
        <ImagemBackground resizeMethod='resize' resizeMode='stretch' source={Background}/>
        <ImagemLogo source={LogoWhite}/>
      </TopoBackground>
      <TextoConteiner>
        <Titulo>
          Junte-se a nós
        </Titulo>
        <Descricao>
          A melhor forma de interagir com seu condomínio
        </Descricao>
      </TextoConteiner>
      <EnvolvedorBotoes>
        <Botao
          texto='Entrar'
          aoPressionar={() => {navigation.navigate('entrar')}}
          tipo='preenchido'
        />
        <Divisor />
        <Botao
          texto='Cadastre-se'
          aoPressionar={() => {navigation.navigate('cadastro')}}
          tipo='preenchido'
        />
      </EnvolvedorBotoes>
    </Conteiner>
  )
}

export default Inicio