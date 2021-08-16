import React, { useState, useEffect, useContext } from 'react'
import { Keyboard, ScrollView } from 'react-native'

import { ActivityIndicator } from 'react-native-paper'

import { ContextoMorador } from '../../../contextos/ContextoMorador'
import { ContextoAutenticacao } from '../../../contextos/ContextoAutenticacao'

import { StackScreenProps } from '@react-navigation/stack'
import { RotasMoradoresParamsList } from '../rotas'

import { tema } from '../../../global/estilos/tema'
import { validadorEntradaStringNumero } from '../../../utils/Validadores'
import AnimacoesPerfil from './animacoes'
import { iMorador } from '../../../models/Morador'

import EntradaDeDados from '../../../componentes/EntradaDeDados'
import Botao from '../../../componentes/Botao'

import {
  Envolvedor,
  Foto,
  Divisor,
  BotaoConteiner,
  CarregandoView
} from './estilos'

interface iMoradorScreen extends StackScreenProps<RotasMoradoresParamsList, 'administrarMorador'> {}

const TelaPerfil: React.FC<iMoradorScreen> = () => {
  const { user } = useContext(ContextoAutenticacao)
  const { getMorador, alterarMorador } = useContext(ContextoMorador)

  const [carregando, setCarregando] = useState(true)

  const [foto, setFoto] = useState('')
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [cpf, setCPF] = useState('')
  const [numero, setNumero] = useState('')
  const [senha, setSenha] = useState('')
  const [confirmarSenha, setConfirmarSenha] = useState('')

  useEffect(() => {
    if(user.uid){
      getMorador(user.uid as string)
      .then((res) => {
        if(res) {
          setNome(res.nome)
          setEmail(res.email)
          setCPF(res.cpf)
          setNumero(res.numero ? res.numero : '')
          setFoto(res.foto ? res.foto : '')
        }
  
        setCarregando(false)
      })
    }
  }, [])
 
  const salvarMorador = async () => {
    Keyboard.dismiss()

    const morador: iMorador = {
      id: user.uid!,
      cpf,
      email,
      nome,
      foto,
      numero,
    }

    await alterarMorador(morador, senha === confirmarSenha ? senha : null)
  }

  return (carregando ? (
    <CarregandoView>
      <ActivityIndicator color={tema.color.azulEscuro} size='large'/>
    </CarregandoView>
    ) : (
      <Envolvedor>
        {foto ? (
          <Foto source={{ uri: foto }} />
        ) : (
          <AnimacoesPerfil />
        )}

        <Divisor/>

        <ScrollView keyboardShouldPersistTaps='always' showsVerticalScrollIndicator={false} focusable keyboardDismissMode='interactive'>
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
            valor={numero}
            setValor={setNumero}
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
          <BotaoConteiner>
            <Botao tipo='preenchido' texto="Salvar" aoPressionar={salvarMorador}/>
          </BotaoConteiner>
        </ScrollView>
      </Envolvedor>
    )
  )
}

export default TelaPerfil
