export const validadorDeEmail = (entrada: string | undefined) => {
  return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    entrada as string,
  );
};

export const validadorString = (entrada: string | undefined) => {
  return /^[a-zA-Z ]+$/.test(entrada as string);
};

export const validadorTituloAmbiente = (entrada: string | undefined) => {
  return /^[a-zA-Z0-9 ]+$/.test(entrada as string);
};

export const validadorDescricaoAmbiente = (entrada: string | undefined) => {
  return /^[a-zA-Z0-9 \n]+$/.test(entrada as string);
};

export const validadorData = (entrada: string | undefined) => {
  return /(^(((0[1-9]|1[0-9]|2[0-8])[\/](0[1-9]|1[012]))|((29|30|31)[\/](0[13578]|1[02]))|((29|30)[\/](0[4,6,9]|11)))[\/](19|[2-9][0-9])\d\d$)|(^29[\/]02[\/](19|[2-9][0-9])(00|04|08|12|16|20|24|28|32|36|40|44|48|52|56|60|64|68|72|76|80|84|88|92|96)$)/.test(
    entrada as string,
  );
};

export const validadorEntradaStringNumero = (entrada: string | undefined) => {
  return /^[a-zA-Z0-9ãçéíõ ]{2,}$/.test(entrada as string);
};

export const validadorCPF = (entrada: string | undefined) => {
  return /^([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})$/.test(
    entrada as string,
  );
};

export const validadorDeNumero = (entrada: string | undefined) => {
  return /(?=.*\d)[A-Za-z0-9]{1,11}/.test(entrada as string);
};
