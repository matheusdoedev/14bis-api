import { Request, Response } from 'express';
import parseStringToDate from '../../utils/parseStringToDate';
// models
import Startup from '../models/Startup';

class StartupController {
  static async postCreateStartup(req: Request, res: Response) {
    try {
      let {
        ID_USUARIO,
        NOME_FANTASIA,
        RAZAO_SOCIAL,
        CNPJ,
        DT_FUNDACAO,
        ID_SEGUIMENTO_PRINC,
        ID_SEGUIMENTO_SECUN,
        ID_MODELO_NEGOCIO,
        ID_MOMENTO,
        ID_PUBLICO_ALVO,
        ID_TAMANHO_TIME,
        ID_FATURAMENTO_ANUAL,
        CAMINHO_FOTO,
        WEBSITE,
        LINKEDIN,
        FACEBOOK,
        ENDERECO,
        UF,
        CIDADE,
      } = req.body;

      const startup = {
        ID_STARTUP: ID_USUARIO,
        NOME_FANTASIA,
        RAZAO_SOCIAL,
        CNPJ,
        DT_FUNDACAO: parseStringToDate(DT_FUNDACAO),
        ID_SEGUIMENTO_PRINC,
        ID_SEGUIMENTO_SECUN,
        ID_MODELO_NEGOCIO,
        ID_MOMENTO,
        ID_PUBLICO_ALVO,
        ID_TAMANHO_TIME,
        ID_FATURAMENTO_ANUAL,
        CAMINHO_FOTO,
        WEBSITE,
        LINKEDIN,
        FACEBOOK,
        ENDERECO,
        UF,
        CIDADE,
      };

      // saving user data on Startup migration
      const insertedStartup = await Startup.create(startup);

      // getting registered ID_STARTUP
      const startupId = insertedStartup.getDataValue('ID_STARTUP');

      return res.json({
        startupId,
      });
    } catch (error) {
      console.log(error);
      return res.status(400).send({ error: 'Erro ao criar Startup' });
    }
  }
}

export default StartupController;
