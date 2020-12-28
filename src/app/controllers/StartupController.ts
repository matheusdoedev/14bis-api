import { Request, Response } from 'express';

import parseStringToDate from '../../utils/parseStringToDate';

import Startup from '../models/Startup';

class StartupController {
  static async postCreateStartup(req: Request, res: Response) {
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

    // creating a new startup
    await Startup.create({
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
    })
      .then((r) => {
        const startupId = r.getDataValue('ID_STARTUP');

        return res.json({
          startupId,
        });
      })
      .catch((err) => {
        return res.status(400).json({ message: 'Erro ao criar Startup', err });
      });
  }

  static async getStartupData(req: Request, res: Response) {
    const { ID_USUARIO } = req.params;

    // searching in database if exists a startup with this ID
    await Startup.findOne({
      where: {
        ID_STARTUP: ID_USUARIO,
      },
    }).then((r) => {
      return res.json({ startup: r?.get() });
    });
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

    // updating startup data
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
    ).then((r) => {
      return res.json({ ID_USUARIO });
    });
  }
}

export default StartupController;
