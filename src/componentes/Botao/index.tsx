import React from 'react'

import {
  Pressionavel,
  Texto
} from './estilos'

interface iBotao {
  texto: string,
  aoPressionar: () => void,
  tipo: 'preenchido' | 'wireframe'
}

const Botao: React.FC<iBotao> = ({ texto, aoPressionar, tipo }) => {
  return (
    <Pressionavel onPress={aoPressionar} activeOpacity={0.7} tipo={tipo}>
      <Texto tipo={tipo}>
        {texto}
      </Texto>
    </Pressionavel>
  )
}

export default Botao