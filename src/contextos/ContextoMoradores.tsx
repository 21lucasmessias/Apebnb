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
        nome: "Lucas",
        cpf: '00000000000',
        email: 'lucas@gmail.com',
        numero: '998540419'
      },
      {
        nome: "Lucas",
        cpf: '00000000000',
        email: 'lucas@gmail.com',
        numero: '998540419'
      },
      {
        nome: "Lucas",
        cpf: '00000000000',
        email: 'lucas@gmail.com',
        numero: '998540419'
      },
      {
        nome: "Lucas",
        cpf: '00000000000',
        email: 'lucas@gmail.com',
        numero: '998540419'
      },
      {
        nome: "Lucas",
        cpf: '00000000000',
        email: 'lucas@gmail.com',
        numero: '998540419'
      },
      {
        nome: "Lucas",
        cpf: '00000000000',
        email: 'lucas@gmail.com',
        numero: '998540419'
      },
      {
        nome: "Lucas",
        cpf: '00000000000',
        email: 'lucas@gmail.com',
        numero: '998540419'
      },
      {
        nome: "Lucas",
        cpf: '00000000000',
        email: 'lucas@gmail.com',
        numero: '998540419'
      },
      {
        nome: "Lucas",
        cpf: '00000000000',
        email: 'lucas@gmail.com',
        numero: '998540419'
      }
    ])

    setMoradoresFiltrados([
      {
        nome: "Lucas",
        cpf: '00000000000',
        email: 'lucas@gmail.com',
        numero: '998540419'
      },
      {
        nome: "Lucas",
        cpf: '00000000000',
        email: 'lucas@gmail.com',
        numero: '998540419'
      },
      {
        nome: "Lucas",
        cpf: '00000000000',
        email: 'lucas@gmail.com',
        numero: '998540419'
      },
      {
        nome: "Lucas",
        cpf: '00000000000',
        email: 'lucas@gmail.com',
        numero: '998540419'
      },
      {
        nome: "Lucas",
        cpf: '00000000000',
        email: 'lucas@gmail.com',
        numero: '998540419'
      },
      {
        nome: "Lucas",
        cpf: '00000000000',
        email: 'lucas@gmail.com',
        numero: '998540419'
      },
      {
        nome: "Lucas",
        cpf: '00000000000',
        email: 'lucas@gmail.com',
        numero: '998540419'
      },
      {
        nome: "Lucas",
        cpf: '00000000000',
        email: 'lucas@gmail.com',
        numero: '998540419'
      },
      {
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