import React, {useEffect, useState} from 'react';

import {iAmbiente} from '../../models/Ambiente';
import DiaSemana from '../DiaSemana';

import {Envolvedor} from './estilos';

interface iSeletorDiasSemana {
  diasDisponiveis: iAmbiente['diasDisponiveis'];
  setDiasDisponiveis: React.Dispatch<React.SetStateAction<boolean[]>>;
}

const SeletorDiasSemana: React.FC<iSeletorDiasSemana> = ({
  diasDisponiveis,
  setDiasDisponiveis,
}) => {
  const [domingo, setDomingo] = useState(diasDisponiveis[0]);
  const [segunda, setSegunda] = useState(diasDisponiveis[1]);
  const [terca, setTerca] = useState(diasDisponiveis[2]);
  const [quarta, setQuarta] = useState(diasDisponiveis[3]);
  const [quinta, setQuinta] = useState(diasDisponiveis[4]);
  const [sexta, setSexta] = useState(diasDisponiveis[5]);
  const [sabado, setSabado] = useState(diasDisponiveis[6]);

  useEffect(() => {
    setDiasDisponiveis([
      domingo,
      segunda,
      terca,
      quarta,
      quinta,
      sexta,
      sabado,
    ]);
  }, [domingo, segunda, terca, quarta, quinta, sexta, sabado]);

  return (
    <Envolvedor>
      <DiaSemana nome={'DOM'} dia={domingo} setDia={setDomingo} />
      <DiaSemana nome={'SEG'} dia={segunda} setDia={setSegunda} />
      <DiaSemana nome={'TER'} dia={terca} setDia={setTerca} />
      <DiaSemana nome={'QUA'} dia={quarta} setDia={setQuarta} />
      <DiaSemana nome={'QUI'} dia={quinta} setDia={setQuinta} />
      <DiaSemana nome={'SEX'} dia={sexta} setDia={setSexta} />
      <DiaSemana nome={'SAB'} dia={sabado} setDia={setSabado} />
    </Envolvedor>
  );
};

export default SeletorDiasSemana;
