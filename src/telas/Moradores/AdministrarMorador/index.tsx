import React, { useState, useContext } from 'react'
import { ScrollView, Keyboard } from 'react-native'

import { ContextoMorador } from '../../../contextos/ContextoMorador'

import { StackHeaderProps, StackScreenProps } from '@react-navigation/stack'
import { RotasMoradoresParamsList } from '../rotas'
import { RouteProp } from '@react-navigation/native'

import { validadorEntradaStringNumero } from '../../../utils/Validadores'
import { showToast } from '../../../utils/Animacoes'
import AnimacoesAdministrarMorador from './animacoes'

import EntradaDeDados from '../../../componentes/EntradaDeDados'
import Botao from '../../../componentes/Botao'
import Cabecalho from '../../../componentes/Cabecalho'

import {
  Envolvedor,
  Foto,
  Divisor,
  BotaoConteiner
} from './estilos'

interface iMoradorScreen extends StackScreenProps<RotasMoradoresParamsList, 'administrarMorador'> {}

const AdministrarMorador: React.FC<iMoradorScreen> = ({ route }) => {
  const { morador } = route.params
  const { setDadosMorador } = useContext(ContextoMorador)

  const [foto, setFoto] = useState<string>(morador.foto ? morador.foto : '')
  const [nome, setNome] = useState<string>(morador.nome)
  const [email, setEmail] = useState<string>(morador.email)
  const [cpf, setCPF] = useState<string>(morador.cpf)
  const [numero, setNumero] = useState<string>(morador.numero ? morador.numero : '')
  const [senha, setSenha] = useState<string>('')
  const [confirmarSenha, setConfirmarSenha] = useState<string>('')
 
  const salvarMorador = () => {
    Keyboard.dismiss()

    setDadosMorador({
      id: morador.id,
      cpf,
      email,
      nome,
      foto,
      numero,
      aprovado: morador.aprovado
    }, senha === confirmarSenha ? senha : null)
    .then((res) => {
      showToast('Dados alterados com sucesso')
    })
    .catch((err) => {
      console.log(err)
      showToast('Algo deu errado. Contate o desenvolvedor.')
    }) 
  }

  return (
    <Envolvedor>
      {morador.foto ? (
        <Foto source={{ uri: morador.foto }} />
      ) : (
        <AnimacoesAdministrarMorador />
      )}

      <Divisor/>

      <ScrollView keyboardShouldPersistTaps='always' showsVerticalScrollIndicator={false}>
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

      </ScrollView>
      <BotaoConteiner>
        <Botao tipo='preenchido' texto="Salvar" aoPressionar={salvarMorador}/>
      </BotaoConteiner>
    </Envolvedor>
  )
}

interface iCabecalhoAdministrarMorador {
  props: StackHeaderProps
}

export const CabecalhoAdministrarMorador: React.FC<iCabecalhoAdministrarMorador> = ({props}) => {
  const { removerMorador } = useContext(ContextoMorador)

  return (
    <Cabecalho
      stackCabecalhoProps={props}
      menusAdicionais={[
        {
          acao: () => {
            removerMorador((props.scene.route as RouteProp<RotasMoradoresParamsList, "administrarMorador">).params.morador)
            .then(() => {
              props.navigation.goBack()
            })
          },
          nome: 'trash',
          texto: 'Excluir'
        }
      ]}
    />
  )
}

export default AdministrarMorador
