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
  const [segunda, setSegunda] = useState(diasDisponiveis ? diasDisponiveis.segunda : true)
  const [terca, setTerca] = useState(diasDisponiveis ? diasDisponiveis.terca : true)
  const [quarta, setQuarta] = useState(diasDisponiveis ? diasDisponiveis.quarta : true)
  const [quinta, setQuinta] = useState(diasDisponiveis ? diasDisponiveis.quinta : true)
  const [sexta, setSexta] = useState(diasDisponiveis ? diasDisponiveis.sexta : true)
  const [sabado, setSabado] = useState(diasDisponiveis ? diasDisponiveis.sabado : true)
  const [domingo, setDomingo] = useState(diasDisponiveis ? diasDisponiveis.domingo : true)

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