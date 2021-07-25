import React from 'react'

import { FlatList } from 'react-native'

import {
  Pressionavel,
  Texto,
  Titulo
} from './estilos'

interface iListaHorarios  {
  setHorarioEscolhido: React.Dispatch<React.SetStateAction<string>>,
  setHorarioVisivel: React.Dispatch<React.SetStateAction<boolean>>,
}

const ListaHorarios: React.FC<iListaHorarios> = ({ setHorarioEscolhido, setHorarioVisivel }) => {
  const horarios = [
    { horario: '09:00-10:00' },
    { horario: '10:00-11:00' },
    { horario: '11:00-12:00' },
    { horario: '12:00-13:00' },
    { horario: '13:00-14:00' },
    { horario: '14:00-15:00' },
  ]

  return (
    <>
      <Titulo>Selecione um horário</Titulo>
      <FlatList
        data={horarios}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({item}) => (
          <Pressionavel
            onPress={() => {
              setHorarioEscolhido(item.horario)
              setHorarioVisivel(false)
            }}
          >
            <Texto>
              {item.horario}
            </Texto>
          </Pressionavel>
        )}
      />
    </>
  )
}

export default ListaHorarios