// Startup Props
export interface StartupProps {
  ID_STARTUP: number;
  NOME_FANTASIA: string;
  RAZAO_SOCIAL: string;
  DT_FUNDACAO: Date | undefined;
  CNPJ: string;
  CAMINHO_FOTO: string;
  ID_MODELO_NEGOCIO: number;
  ID_PUBLICO_ALVO: number;
  ID_MOMENTO: number;
  ID_SEGUIMENTO_PRINC: number;
  ID_SEGUIMENTO_SECUN: number;
  ID_TAMANHO_TIME: number;
  ID_FATURAMENTO_ANUAL: number;
  WEBSITE: string;
  LINKEDIN: string;
  FACEBOOK: string;
  ENDERECO: string;
  UF: string;
  CIDADE: string;
}
