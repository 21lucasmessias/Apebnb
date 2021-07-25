import React, { forwardRef } from 'react'
import { useState } from 'react'
import { View } from 'react-native'

import {
  Envolvedor,
  Pressionavel,
  Texto,
} from './estilos'

interface iSeletorDiasSemana {

}

const SeletorDiasSemana = forwardRef<View, iSeletorDiasSemana>((props, ref) => {
  const [segunda, setSegunda] = useState(true)
  const [terca, setTerca] = useState(true)
  const [quarta, setQuarta] = useState(true)
  const [quinta, setQuinta] = useState(true)
  const [sexta, setSexta] = useState(true)
  const [sabado, setSabado] = useState(true)
  const [domingo, setDomingo] = useState(true)

  interface iDiaSemana {
    nome: string,
    dia: boolean,
    setDia: React.Dispatch<React.SetStateAction<boolean>>
  }
  const DiaSemana: React.FC<iDiaSemana> = ({nome, dia, setDia}) => (
    <Pressionavel selecionado={dia} onPress={() => setDia(!dia)}>
      <Texto>
        {nome}
      </Texto>
    </Pressionavel>
  )

  return(
    <Envolvedor ref={ref}>
      <DiaSemana nome={'SEG'} dia={segunda} setDia={setSegunda} />
      <DiaSemana nome={'TER'} dia={terca} setDia={setTerca} />
      <DiaSemana nome={'QUA'} dia={quarta} setDia={setQuarta} />
      <DiaSemana nome={'QUI'} dia={quinta} setDia={setQuinta} />
      <DiaSemana nome={'SEX'} dia={sexta} setDia={setSexta} />
      <DiaSemana nome={'SAB'} dia={sabado} setDia={setSabado} />
      <DiaSemana nome={'DOM'} dia={domingo} setDia={setDomingo} />
    </Envolvedor>
  )
})

export default SeletorDiasSemana