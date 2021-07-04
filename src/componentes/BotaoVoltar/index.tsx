import React from 'react'

import {
  Pressionavel,
  Texto
} from './estilos'

interface iBotaoVoltar {
  aoPressionar: () => void
}

export const BotaoVoltar: React.FC<iBotaoVoltar> = ({ aoPressionar }) => {
  return (
    <Pressionavel onPress={aoPressionar} activeOpacity={0.7}>
      <Texto>
        Voltar
      </Texto>
    </Pressionavel>
  )
}
