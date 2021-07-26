import React, { useState } from 'react'

import { StackScreenProps } from '@react-navigation/stack'
import { ScrollView } from 'react-native'

import { RotasMoradoresParamsList } from '../rotas'
import { validadorEntradaStringNumero } from '../../../utils/Validadores'

import Botao from '../../../componentes/Botao'
import EntradaDeDados from '../../../componentes/EntradaDeDados'

import {
  Conteiner,
  Envolvedor,
  Divisor,
  EnvolvedorBotoes,
  SubTitulo
} from './estilos'

interface iMoradorScreen extends StackScreenProps<RotasMoradoresParamsList, 'criarMorador'> {}

const CriarMorador: React.FC<iMoradorScreen> = () => {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [cpf, setCPF] = useState('')
 
  const salvarMorador = () => {
    console.log({
      nome: nome,
      email: email,
      cpf: cpf,
    })
  }

  return (
    <Conteiner>
      <Envolvedor>
        <SubTitulo>Insira os dados do Morador</SubTitulo>
        <ScrollView showsVerticalScrollIndicator={false}>
          <EntradaDeDados
            nome='Nome completo'
            valor={nome}
            setValor={setNome}
            validador={validadorEntradaStringNumero}
          />

          <Divisor/>
          
          <EntradaDeDados
            nome='CPF'
            valor={cpf}
            setValor={setCPF}
            validador={validadorEntradaStringNumero}
          />
      
          <Divisor/>

          <EntradaDeDados
            nome='Email'
            valor={email}
            setValor={setEmail}
            validador={validadorEntradaStringNumero}
          />

          <Divisor/>
        </ScrollView>
      </Envolvedor>

      <EnvolvedorBotoes>
        <Botao tipo='preenchido' texto="Salvar" aoPressionar={salvarMorador}/>
      </EnvolvedorBotoes>
    </Conteiner>
  )
}

export default CriarMorador
