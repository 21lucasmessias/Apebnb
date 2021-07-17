import React, { useEffect, useState } from 'react'
import { iAmbiente } from '../models/Ambiente'

interface iContextoAmbientes {
  ambientes: Array<iAmbiente>,
  setAmbientes: React.Dispatch<React.SetStateAction<iAmbiente[]>>,
  ambientesFiltrados: iAmbiente[],
  setAmbientesFiltrados: React.Dispatch<React.SetStateAction<iAmbiente[]>>
}

export const ContextoAmbientes = React.createContext({} as iContextoAmbientes)

type iContextoAmbientesProvider = {
  children: React.ReactNode;
}

const ContextoAmbientesProvider: React.FC<iContextoAmbientesProvider> = ({ children }) => {
  const [ambientes, setAmbientes] = useState<Array<iAmbiente>>([])
  const [ambientesFiltrados, setAmbientesFiltrados] = useState<Array<iAmbiente>>([])

  useEffect(() => {
    setAmbientes([
      {
        nome: "Salão de Jogos",
        descricao: "Lorem ipsum condimentum orci posuere class mattis fringilla donec, turpis luctus quam leo interdum senectus sem, venenatis taciti enim facilisis sit laoreet feugiat. viverra nisl senectus lectus lobortis mattis eu turpis sem scelerisque tempor nisi pellentesque euismod hac, convallis pellentesque donec pretium porttitor.",
        diasDisponiveis: {
          segunda: true,
          terca: true,
          quarta: true,
          quinta: true,
          sexta: true,
          sabado: false,
          domingo: false
        },
        foto: null
      },
      {
        nome: "Salão de Jogos",
        descricao: "Lorem ipsum condimentum orci posuere class mattis fringilla donec, turpis luctus quam leo interdum senectus sem, venenatis taciti enim facilisis sit laoreet feugiat. viverra nisl senectus lectus lobortis mattis eu turpis sem scelerisque tempor nisi pellentesque euismod hac, convallis pellentesque donec pretium porttitor.",
        diasDisponiveis: {
          segunda: true,
          terca: true,
          quarta: true,
          quinta: true,
          sexta: true,
          sabado: false,
          domingo: false
        },
        foto: null
      },
      {
        nome: "Salão de Jogos",
        descricao: "Lorem ipsum condimentum orci posuere class mattis fringilla donec, turpis luctus quam leo interdum senectus sem, venenatis taciti enim facilisis sit laoreet feugiat. viverra nisl senectus lectus lobortis mattis eu turpis sem scelerisque tempor nisi pellentesque euismod hac, convallis pellentesque donec pretium porttitor.",
        diasDisponiveis: {
          segunda: true,
          terca: true,
          quarta: true,
          quinta: true,
          sexta: true,
          sabado: false,
          domingo: false
        },
        foto: null
      }
    ])

    setAmbientesFiltrados([
      {
        nome: "Salão de Jogos",
        descricao: "Lorem ipsum condimentum orci posuere class mattis fringilla donec, turpis luctus quam leo interdum senectus sem, venenatis taciti enim facilisis sit laoreet feugiat. viverra nisl senectus lectus lobortis mattis eu turpis sem scelerisque tempor nisi pellentesque euismod hac, convallis pellentesque donec pretium porttitor.",
        diasDisponiveis: {
          segunda: true,
          terca: true,
          quarta: true,
          quinta: true,
          sexta: true,
          sabado: false,
          domingo: false
        },
        foto: null
      },
      {
        nome: "Salão de Jogos",
        descricao: "Lorem ipsum condimentum orci posuere class mattis fringilla donec, turpis luctus quam leo interdum senectus sem, venenatis taciti enim facilisis sit laoreet feugiat. viverra nisl senectus lectus lobortis mattis eu turpis sem scelerisque tempor nisi pellentesque euismod hac, convallis pellentesque donec pretium porttitor.",
        diasDisponiveis: {
          segunda: true,
          terca: true,
          quarta: true,
          quinta: true,
          sexta: true,
          sabado: false,
          domingo: false
        },
        foto: null
      },
      {
        nome: "Salão de Jogos",
        descricao: "Lorem ipsum condimentum orci posuere class mattis fringilla donec, turpis luctus quam leo interdum senectus sem, venenatis taciti enim facilisis sit laoreet feugiat. viverra nisl senectus lectus lobortis mattis eu turpis sem scelerisque tempor nisi pellentesque euismod hac, convallis pellentesque donec pretium porttitor.",
        diasDisponiveis: {
          segunda: true,
          terca: true,
          quarta: true,
          quinta: true,
          sexta: true,
          sabado: false,
          domingo: false
        },
        foto: null
      }
    ])
  }, [])

  return (
    <ContextoAmbientes.Provider value={{
      ambientes: ambientes,
      setAmbientes: setAmbientes,
      ambientesFiltrados: ambientesFiltrados,
      setAmbientesFiltrados: setAmbientesFiltrados
    }}>
      {children}
    </ContextoAmbientes.Provider >
  )
}

export default ContextoAmbientesProvider