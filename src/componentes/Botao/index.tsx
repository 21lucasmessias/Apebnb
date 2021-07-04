import React from 'react'

import {
  Pressionavel,
  Texto
} from './estilos'

interface iBotao {
  texto: string,
  aoPressionar: () => void
}

export const Botao: React.FC<iBotao> = ({ texto, aoPressionar }) => {
  return (
    <Pressionavel onPress={aoPressionar} activeOpacity={0.7}>
      <Texto>
        {texto}
      </Texto>
    </Pressionavel>
  )
}
