export interface iAmbiente {
  id: string,
  foto: string | null,
  nome: string,
  descricao: string,
  diasDisponiveis: {
    segunda: boolean,
    terca: boolean,
    quarta: boolean,
    quinta: boolean,
    sexta: boolean,
    sabado: boolean,
    domingo: boolean
  }
}
