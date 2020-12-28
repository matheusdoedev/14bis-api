// User model types
export interface UserProps {
  ID_USUARIO?: number;
  NOME_COMPLETO: string;
  EMAIL_LOGIN: string;
  FONE_LOGIN: string;
  SENHA: string;
  ID_PERFIL: 'MENTO' | 'EMPRE' | 'ADMIN' | 'INVES' | 'CONSU';
  SN_ATIVO: string;
}
