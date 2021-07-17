import React, { useState } from 'react'
import { KeyboardTypeOptions, TextInputAndroidProps, TextInputProps, TouchableWithoutFeedback } from 'react-native'

import Icon from 'react-native-vector-icons/Feather'
import { tema } from '../../global/estilos/tema'

import {
  Envolvedor,
  EntradaTexto
} from './estilos'

interface iEntradaDeDados extends TextInputProps {
  valor: string,
  nome: string,
  tipoTeclado?: KeyboardTypeOptions,
  tipoAutoCompletar?: TextInputAndroidProps['autoCompleteType'],
  validador: (entrada: string | undefined) => boolean,
}

const EntradaDeDados: React.FC<iEntradaDeDados> = (({ valor, tipoTeclado, tipoAutoCompletar, validador, ...rest }) => {
  const [focado, setFocado] = useState(false);
  const [erro, setErro] = useState(false);
  const [verSenha, setVerSenha] = useState(false);

  return (
    <Envolvedor>
      <EntradaTexto
        value={valor}

        onFocus={() => {
          setFocado(true)
        }}

        onEndEditing={() => {
          setFocado(false)
          setErro(!validador(valor))
        }}

        secureTextEntry={tipoAutoCompletar == 'password' && !verSenha}

        keyboardType={tipoTeclado ? tipoTeclado : 'default'}
        autoCompleteType={tipoAutoCompletar}

        focado={focado}
        erro={erro}

        {...rest}
      />

      {tipoAutoCompletar == 'password' && (
        <TouchableWithoutFeedback onPress={() => setVerSenha(!verSenha)}>
          <Icon name={verSenha ? 'eye' : 'eye-off'} size={24} color={tema.color.azulEscuro} style={{ position: 'absolute', right: 54 }} />
        </TouchableWithoutFeedback>
      )}

    </Envolvedor>
  )
})

export default EntradaDeDados