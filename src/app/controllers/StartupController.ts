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

      // saving user data on Startup migration
      const insertedStartup = await Startup.create({
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
      });

      // getting registered ID_STARTUP
      const startupId = insertedStartup.getDataValue('ID_STARTUP');

      return res.json({
        startupId,
      });
    } catch (err) {
      console.log(err);
      return res.status(400).json({ message: 'Erro ao criar Startup', err });
    }
  }

  static async getStartupData(req: Request, res: Response) {
    const { ID_USUARIO } = req.params;

    // searching in database if exists a startup with this ID
    const startup = await Startup.findOne({
      where: {
        ID_STARTUP: ID_USUARIO,
      },
    })
      .then((r) => r?.get())
      .catch((err) => {
        console.log(err);
      });

    // returning startup data
    return res.json({ ...startup });
  }

  static async putStartupData(req: Request, res: Response) {
    const {
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

    const { ID_USUARIO } = req.params;

    await Startup.update(
      {
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
      },
      { where: { ID_STARTUP: ID_USUARIO } }
    );

    return res.json({ ID_USUARIO });
  }
}

export default StartupController;
