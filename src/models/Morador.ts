export interface iMorador {
  id: string;
  foto?: string;
  nome: string;
  cpf: string;
  numero?: string;
  email: string;
  aprovado?: boolean;
  moradorAdministrador?: boolean;
}
