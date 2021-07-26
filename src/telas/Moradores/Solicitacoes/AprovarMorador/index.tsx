import React, { useState } from 'react'

import { StackScreenProps } from '@react-navigation/stack'
import { ScrollView } from 'react-native'

import { RotasMoradoresParamsList } from '../../rotas'
import { validadorEntradaStringNumero } from '../../../../utils/Validadores'

import Botao from '../../../../componentes/Botao'
import EntradaDeDados from '../../../../componentes/EntradaDeDados'

import {
  Conteiner,
  Envolvedor,
  Divisor,
  EnvolvedorBotoes,
  SubTitulo
} from './estilos'

interface iMoradorScreen extends StackScreenProps<RotasMoradoresParamsList, 'aprovarMorador'> {}

const AprovarMorador: React.FC<iMoradorScreen> = ({route}) => {
  const {morador} = route.params

  const [nome, setNome] = useState(morador.nome ? morador.nome : '')
  const [email, setEmail] = useState(morador.email ? morador.email : '')
  const [cpf, setCPF] = useState(morador.cpf ? morador.cpf : '')
  const [celular, setCelular] = useState(morador.numero ? morador.numero : '')
 
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
        <SubTitulo>Verifique os dados do Morador</SubTitulo>
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

          <EntradaDeDados
            nome='Celular'
            valor={celular}
            setValor={setCelular}
            validador={validadorEntradaStringNumero}
          />

          <Divisor/>
        </ScrollView>
      </Envolvedor>

      <EnvolvedorBotoes>
        <Botao tipo='preenchido' texto="Aprovar" aoPressionar={salvarMorador}/>
      </EnvolvedorBotoes>
    </Conteiner>
  )
}

export default AprovarMorador
