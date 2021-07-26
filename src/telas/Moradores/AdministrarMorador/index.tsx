import React, { useState, useEffect, useContext, useCallback } from 'react'
import { Keyboard, StyleSheet, ScrollView } from 'react-native'

import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'

import { StackScreenProps } from '@react-navigation/stack'
import { RotasMoradoresParamsList } from '../rotas'

import { tema } from '../../../global/estilos/tema'
import { width } from '../../../utils/Utils'
import { validadorEntradaStringNumero } from '../../../utils/Validadores'
import { comBouncing, semBouncing } from '../../../utils/Animacoes'

import Icon from 'react-native-vector-icons/Feather'

import Botao from '../../../componentes/Botao'

import {
  Envolvedor,
  Foto,
  Divisor,
  BotaoConteiner
} from './estilos'
import EntradaDeDados from '../../../componentes/EntradaDeDados'
import { ContextoTeclado } from '../../../contextos/ContextoTeclado'

interface iMoradorScreen extends StackScreenProps<RotasMoradoresParamsList, 'administrarMorador'> {}

const AdministrarMorador: React.FC<iMoradorScreen> = ({ route }) => {
  const { morador } = route.params
  const { tecladoVisivel } = useContext(ContextoTeclado)

  const [nome, setNome] = useState(morador.nome)
  const [email, setEmail] = useState('')
  const [cpf, setCPF] = useState('')
  const [celular, setCelular] = useState('')
  const [senha, setSenha] = useState('')
  const [confirmarSenha, setConfirmarSenha] = useState('')

  const widthFoto = useSharedValue(width/3)
  const heightFoto = useSharedValue(width/3)
  const borderRadiusFoto = useSharedValue(width/3)
  
  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: widthFoto.value,
      height: heightFoto.value,
      borderRadius: borderRadiusFoto.value
    };
  });

  const esconderFoto = () => {
    widthFoto.value = withSpring(width - 24, semBouncing)
    heightFoto.value = withSpring(50, semBouncing)
    borderRadiusFoto.value = withSpring(15, comBouncing)
  }

  const mostrarFoto = () => {
    widthFoto.value = withSpring(width/3, semBouncing)
    heightFoto.value = withSpring(width/3, semBouncing)
    borderRadiusFoto.value = withSpring(width/3, comBouncing)
  }

  useEffect(() => {
    if(!tecladoVisivel){
      esconderFoto()
    } else {
      mostrarFoto()
    }
  }, [tecladoVisivel])
 
  const salvarMorador = () => {
    console.log({
      nome: nome,
      email: email,
      cpf: cpf,
      celular: celular,
      senha: senha,
      confirmarSenha: confirmarSenha,
    })
  }

  return (
    <Envolvedor>
      {morador.foto ? (
        <Foto source={{ uri: morador.foto }} />
      ) : (
        <Animated.View style={[animatedStyle, styles.fotoConteiner]}>
          <Icon name='camera' size={24} color={tema.color.azulEscuro} />
        </Animated.View>
      )}

      <Divisor/>

      <ScrollView showsVerticalScrollIndicator={false} focusable keyboardDismissMode='interactive'>
        <EntradaDeDados
          nome='Nome completo'
          valor={nome}
          setValor={setNome}
          validador={validadorEntradaStringNumero}
        />

        <Divisor/>

        <EntradaDeDados
          nome='Email'
          valor={email}
          setValor={setEmail}
          validador={validadorEntradaStringNumero}
          tipoTeclado='email-address'
        />

        <Divisor/>
        
        <EntradaDeDados
          nome='CPF'
          valor={cpf}
          setValor={setCPF}
          validador={validadorEntradaStringNumero}
          tipoTeclado='numeric'
        />

        <Divisor/>

        <EntradaDeDados
          nome='Celular'
          valor={celular}
          setValor={setCelular}
          validador={validadorEntradaStringNumero}
          tipoTeclado='numeric'
        />

        <Divisor/>

        <EntradaDeDados
          nome='Senha'
          valor={senha}
          setValor={setSenha}
          validador={validadorEntradaStringNumero}
          tipoAutoCompletar='password'
        />

        <Divisor/>

        <EntradaDeDados
          nome='Confirmar Senha'
          valor={confirmarSenha}
          setValor={setConfirmarSenha}
          validador={validadorEntradaStringNumero}
          tipoAutoCompletar='password'
        />
        
        <Divisor/>

      </ScrollView>
      <BotaoConteiner>
        <Botao tipo='preenchido' texto="Salvar" aoPressionar={salvarMorador}/>
      </BotaoConteiner>
    </Envolvedor>
  )
}

const styles = StyleSheet.create({
  fotoConteiner: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: tema.color.verdeAzulado,
  }
})

export default AdministrarMorador
