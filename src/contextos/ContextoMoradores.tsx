import React, { useEffect, useState } from 'react'
import { iMorador } from '../models/Morador'

interface iContextoMoradores {
  moradores: Array<iMorador>,
  setMoradores: React.Dispatch<React.SetStateAction<iMorador[]>>,
  moradoresFiltrados: iMorador[],
  setMoradoresFiltrados: React.Dispatch<React.SetStateAction<iMorador[]>>
}

export const ContextoMoradores = React.createContext({} as iContextoMoradores)

type iContextoMoradoresProvider = {
  children: React.ReactNode;
}

const ContextoMoradoresProvider: React.FC<iContextoMoradoresProvider> = ({ children }) => {
  const [moradores, setMoradores] = useState<Array<iMorador>>([])
  const [moradoresFiltrados, setMoradoresFiltrados] = useState<Array<iMorador>>([])

  useEffect(() => {
    setMoradores([
      {
        id: '1',
        nome: "Lucas",
        cpf: '00000000000',
        email: 'lucas@gmail.com',
        numero: '998540419'
      },
      {
        id: '2',
        nome: "Lucas",
        cpf: '00000000000',
        email: 'lucas@gmail.com',
        numero: '998540419'
      },
      {
        id: '3',
        nome: "Lucas",
        cpf: '00000000000',
        email: 'lucas@gmail.com',
        numero: '998540419'
      },
      {
        id: '4',
        nome: "Lucas",
        cpf: '00000000000',
        email: 'lucas@gmail.com',
        numero: '998540419'
      },
      {
        id: '5',
        nome: "Lucas",
        cpf: '00000000000',
        email: 'lucas@gmail.com',
        numero: '998540419'
      },
      {
        id: '6',
        nome: "Lucas",
        cpf: '00000000000',
        email: 'lucas@gmail.com',
        numero: '998540419'
      },
      {
        id: '7',
        nome: "Lucas",
        cpf: '00000000000',
        email: 'lucas@gmail.com',
        numero: '998540419'
      },
      {
        id: '8',
        nome: "Lucas",
        cpf: '00000000000',
        email: 'lucas@gmail.com',
        numero: '998540419'
      },
      {
        id: '9',
        nome: "Lucas",
        cpf: '00000000000',
        email: 'lucas@gmail.com',
        numero: '998540419'
      }
    ])

    setMoradoresFiltrados([
      {
        id: '1',
        nome: "Lucas",
        cpf: '00000000000',
        email: 'lucas@gmail.com',
        numero: '998540419'
      },
      {
        id: '2',
        nome: "Lucas",
        cpf: '00000000000',
        email: 'lucas@gmail.com',
        numero: '998540419'
      },
      {
        id: '3',
        nome: "Lucas",
        cpf: '00000000000',
        email: 'lucas@gmail.com',
        numero: '998540419'
      },
      {
        id: '4',
        nome: "Lucas",
        cpf: '00000000000',
        email: 'lucas@gmail.com',
        numero: '998540419'
      },
      {
        id: '5',
        nome: "Lucas",
        cpf: '00000000000',
        email: 'lucas@gmail.com',
        numero: '998540419'
      },
      {
        id: '6',
        nome: "Lucas",
        cpf: '00000000000',
        email: 'lucas@gmail.com',
        numero: '998540419'
      },
      {
        id: '7',
        nome: "Lucas",
        cpf: '00000000000',
        email: 'lucas@gmail.com',
        numero: '998540419'
      },
      {
        id: '8',
        nome: "Lucas",
        cpf: '00000000000',
        email: 'lucas@gmail.com',
        numero: '998540419'
      },
      {
        id: '9',
        nome: "Lucas",
        cpf: '00000000000',
        email: 'lucas@gmail.com',
        numero: '998540419'
      }
    ])
  }, [])

  return (
    <ContextoMoradores.Provider value={{
      moradores: moradores,
      setMoradores: setMoradores,
      moradoresFiltrados: moradoresFiltrados,
      setMoradoresFiltrados: setMoradoresFiltrados
    }}>
      {children}
    </ContextoMoradores.Provider >
  )
}

export default ContextoMoradoresProvider