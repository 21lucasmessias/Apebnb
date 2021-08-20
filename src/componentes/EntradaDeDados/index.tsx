import React, {useState, useRef} from 'react';

import {
  KeyboardTypeOptions,
  TextInputAndroidProps,
  TextInputProps,
  View,
} from 'react-native';

import Icon from 'react-native-vector-icons/Feather';
import {tema} from '../../global/estilos/tema';
import AnimacoesEntradaDeDados from './animacoes';

import {EntradaTexto, EnvolvedorEntrada} from './estilos';

interface iEntradaDeDados extends TextInputProps {
  valor: string;
  setValor?: React.Dispatch<React.SetStateAction<string>>;
  nome: string;
  tipoTeclado?: KeyboardTypeOptions;
  tipoAutoCompletar?: TextInputAndroidProps['autoCompleteType'];
  validador: (entrada: string | undefined) => boolean;
}

const EntradaDeDados: React.FC<iEntradaDeDados> = ({
  valor,
  setValor,
  tipoTeclado,
  tipoAutoCompletar,
  validador,
  nome,
  ...rest
}) => {
  const entradaTextoRef = useRef(null);

  const [focado, setFocado] = useState(false);
  const [erro, setErro] = useState(false);
  const [verSenha, setVerSenha] = useState(false);

  return (
    <AnimacoesEntradaDeDados
      valor={valor}
      nome={nome}
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
          secureTextEntry={tipoAutoCompletar == 'password' && !verSenha}
          keyboardType={tipoTeclado ? tipoTeclado : 'default'}
          autoCompleteType={tipoAutoCompletar}
          focado={focado}
          erro={erro}
          multiline={false}
          scrollEnabled={false}
          autoCorrect={false}
          ref={entradaTextoRef}
          {...rest}
        />

        {tipoAutoCompletar == 'password' && (
          <View
            onTouchStart={() => {
              setVerSenha(!verSenha);
            }}
            style={{
              paddingRight: 12,
            }}>
            <Icon
              name={verSenha ? 'eye' : 'eye-off'}
              size={24}
              color={tema.color.azulEscuro}
            />
          </View>
        )}
      </EnvolvedorEntrada>
    </AnimacoesEntradaDeDados>
  );
};

export default EntradaDeDados;
