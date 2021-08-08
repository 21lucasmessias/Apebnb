import React, { useContext } from 'react'

import { StackScreenProps } from '@react-navigation/stack'
import { ScrollView } from 'react-native'

import { ContextoMoradores } from '../../../../contextos/ContextoMoradores'

import Icon from 'react-native-vector-icons/Feather'

import { RotasMoradoresParamsList } from '../../rotas'
import { validadorEntradaStringNumero } from '../../../../utils/Validadores'
import { tema } from '../../../../global/estilos/tema'

import Botao from '../../../../componentes/Botao'
import EntradaDeDados from '../../../../componentes/EntradaDeDados'

import {
  Conteiner,
  Envolvedor,
  Divisor,
  EnvolvedorBotoes,
  SubTitulo,
  Foto,
  EnvolvedorFoto
} from './estilos'

interface iMoradorScreen extends StackScreenProps<RotasMoradoresParamsList, 'aprovarMorador'> {}

const AprovarMorador: React.FC<iMoradorScreen> = ({route, navigation}) => {
  const { morador } = route.params
  const { setAprovado } = useContext(ContextoMoradores)
 
  const aprovarMorador = () => {
    setAprovado(morador)
    navigation.goBack()
  }

  return (
    <Conteiner>
      <Envolvedor>
        <SubTitulo>Verifique os dados do Morador</SubTitulo>
        {morador.foto ? (
            <Foto source={{ uri: morador.foto }} />
          ) : (
            <EnvolvedorFoto>
              <Icon name='camera' size={24} color={tema.color.azulEscuro} />
            </EnvolvedorFoto>
          )}
        <ScrollView showsVerticalScrollIndicator={false}>
          <EntradaDeDados
            nome='Nome completo'
            valor={morador.nome}
            validador={validadorEntradaStringNumero}
            editable={false}
          />

          <Divisor/>
          
          <EntradaDeDados
            nome='CPF'
            valor={morador.cpf}
            validador={validadorEntradaStringNumero}
            editable={false}
          />
      
          <Divisor/>

          <EntradaDeDados
            nome='Email'
            valor={morador.email}
            validador={validadorEntradaStringNumero}
            editable={false}
          />

          <Divisor/>

          <EntradaDeDados
            nome='Celular'
            valor={morador.numero? morador.numero : ''}
            validador={validadorEntradaStringNumero}
            editable={false}
          />

          <Divisor/>
        </ScrollView>
      </Envolvedor>

      <EnvolvedorBotoes>
        <Botao tipo='preenchido' texto="Aprovar" aoPressionar={aprovarMorador}/>
      </EnvolvedorBotoes>
    </Conteiner>
  )
}

export default AprovarMorador
