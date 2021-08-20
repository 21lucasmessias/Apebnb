import React, {useState, useRef} from 'react';
import {TextInputProps} from 'react-native';

import AnimacoesEntradaDeDadosArea from './animacoes';

import {EntradaTexto, EnvolvedorEntrada} from './estilos';

interface iEntradaDeDadosArea extends TextInputProps {
  valor: string;
  setValor: React.Dispatch<React.SetStateAction<string>>;
  nome: string;
  validador: (entrada: string | undefined) => boolean;
}

const EntradaDeDadosArea: React.FC<iEntradaDeDadosArea> = ({
  valor,
  setValor,
  validador,
  nome,
  ...rest
}) => {
  const entradaTextoRef = useRef(null);

  const [focado, setFocado] = useState(false);
  const [erro, setErro] = useState(false);

  return (
    <AnimacoesEntradaDeDadosArea
      nome={nome}
      valor={valor}
      entradaTextoRef={entradaTextoRef}>
      <EnvolvedorEntrada erro={erro} focado={focado}>
        <EntradaTexto
          value={valor}
          onChangeText={setValor}
          onFocus={() => {
            setFocado(true);
          }}
          onEndEditing={() => {
            setFocado(false);
            setErro(!validador(valor));
          }}
          focado={focado}
          erro={erro}
          multiline
          scrollEnabled
          textAlignVertical="top"
          autoCorrect={false}
          ref={entradaTextoRef}
          {...rest}
        />
      </EnvolvedorEntrada>
    </AnimacoesEntradaDeDadosArea>
  );
};

export default EntradaDeDadosArea;
