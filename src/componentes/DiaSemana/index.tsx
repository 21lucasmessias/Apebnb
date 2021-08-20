import React from 'react';
import {Pressionavel, Texto} from './estilos';

interface iDiaSemana {
  nome: string;
  dia: boolean;
  setDia: React.Dispatch<React.SetStateAction<boolean>>;
}

const DiaSemana: React.FC<iDiaSemana> = ({nome, dia, setDia}) => (
  <Pressionavel selecionado={dia} onPress={() => setDia(!dia)}>
    <Texto>{nome}</Texto>
  </Pressionavel>
);

export default DiaSemana;
