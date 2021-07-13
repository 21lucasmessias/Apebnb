export interface iAmbiente {
  foto: string | null,
  titulo: string,
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
