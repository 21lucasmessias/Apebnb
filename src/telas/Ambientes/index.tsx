import React from 'react'

import {
  Container,
  Wrapper
} from './estilos'

import { Cabecalho } from '../../componentes/Cabecalho'

export const Ambientes: React.FC = () => {
  return (
    <Wrapper>
      <Cabecalho onBack={() => {}} onPressMore={() => {}} showBack={false} />
      <Container>
        
      </Container>
    </Wrapper>
  )
}
