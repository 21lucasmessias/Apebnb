import React, { forwardRef, useState } from 'react'
import { View } from 'react-native'

import { iAmbiente } from '../../models/Ambiente'

import {
  Envolvedor,
  Pressionavel,
  Texto,
} from './estilos'

interface iSeletorDiasSemana {
  diasDisponiveis?: iAmbiente['diasDisponiveis']
}

const SeletorDiasSemana = forwardRef<View, iSeletorDiasSemana>(({diasDisponiveis}, ref) => {
  const [domingo, setDomingo] = useState(diasDisponiveis ? diasDisponiveis[0] : true)
  const [segunda, setSegunda] = useState(diasDisponiveis ? diasDisponiveis[1] : true)
  const [terca, setTerca] = useState(diasDisponiveis ? diasDisponiveis[2] : true)
  const [quarta, setQuarta] = useState(diasDisponiveis ? diasDisponiveis[3] : true)
  const [quinta, setQuinta] = useState(diasDisponiveis ? diasDisponiveis[4] : true)
  const [sexta, setSexta] = useState(diasDisponiveis ? diasDisponiveis[5] : true)
  const [sabado, setSabado] = useState(diasDisponiveis ? diasDisponiveis[6] : true)

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
      <DiaSemana nome={'DOM'} dia={domingo} setDia={setDomingo} />
      <DiaSemana nome={'SEG'} dia={segunda} setDia={setSegunda} />
      <DiaSemana nome={'TER'} dia={terca} setDia={setTerca} />
      <DiaSemana nome={'QUA'} dia={quarta} setDia={setQuarta} />
      <DiaSemana nome={'QUI'} dia={quinta} setDia={setQuinta} />
      <DiaSemana nome={'SEX'} dia={sexta} setDia={setSexta} />
      <DiaSemana nome={'SAB'} dia={sabado} setDia={setSabado} />
    </Envolvedor>
  )
})

export default SeletorDiasSemana