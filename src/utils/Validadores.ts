export const validadorDeEmail = (entrada: string | undefined) => {
  return (/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(entrada as string)
}

export const validadorTituloAmbiente = (entrada: string | undefined) => {
  return (/^[a-zA-Z0-9]+$/.test(entrada as string))
}

export const validadorDescricaoAmbiente = (entrada: string | undefined) => {
  return (/^[a-zA-Z0-9]+$/.test(entrada as string))
}