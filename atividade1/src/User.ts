export interface NewUser {
  nome: string;
  email: string;
  senha: string;
}

export interface User extends NewUser {
  id: string;
}
