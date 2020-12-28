// Mentor model types
export interface MentorProps {
  ID_MENTOR: number;
  CPF: string;
  DT_NASCIMENTO: Date | undefined;
  SEXO: string;
  CEP: string;
  ENDERECO: string;
  UF: string;
  CIDADE: string;
  FONE_FIXO: string;
  FONE_CELULAR: string;
  LINKEDIN: string;
  ESCOLARIDADE: string;
  ID_AREA_ATUACAO: number | undefined;
  CURRICULO_RESUMIDO: string;
  CAMINHO_FOTO: string;
}
