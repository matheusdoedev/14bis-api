import { Request, Response } from 'express';

import parseStringToDate from '../../utils/parseStringToDate';

import Mentor from '../models/Mentor';

class MentorController {
  static async postCreateMentor(req: Request, res: Response) {
    let {
      ID_MENTOR,
      ID_PERFIL,
      CPF,
      DT_NASCIMENTO,
      SEXO,
      CEP,
      ENDERECO,
      UF,
      CIDADE,
      FONE_FIXO,
      FONE_CELULAR,
      LINKEDIN,
      ESCOLARIDADE,
      ID_AREA_ATUACAO,
      CURRICULO_RESUMIDO,
      CAMINHO_FOTO,
    } = req.body;

    // check if is the right profile/role
    if (ID_PERFIL !== 'MENTO') {
      return res.status(400).json({ message: 'Erro ao criar Mentor' });
    }

    // saving Mentor data
    await Mentor.create({
      ID_MENTOR,
      CPF,
      DT_NASCIMENTO: parseStringToDate(DT_NASCIMENTO),
      SEXO,
      CEP,
      ENDERECO,
      UF,
      CIDADE,
      FONE_FIXO,
      FONE_CELULAR,
      LINKEDIN,
      ESCOLARIDADE,
      ID_AREA_ATUACAO,
      CURRICULO_RESUMIDO,
      CAMINHO_FOTO,
    })
      .then((r) => {
        return res.json({
          message: 'Mentor criado com sucesso',
        });
      })
      .catch((err) => {
        return res.status(400).json({ message: 'Erro ao criar Mentor', err });
      });
  }

  static async getMentorData(req: Request, res: Response) {
    let { ID_USUARIO } = req.params;

    // querying if the mentor exists
    await Mentor.findOne({
      where: {
        ID_MENTOR: ID_USUARIO,
      },
    }).then((r) => {
      return res.json({ mentor: r?.get() });
    });
  }

  static async putMentorData(req: Request, res: Response) {
    const {
      CPF,
      DT_NASCIMENTO,
      SEXO,
      CEP,
      ENDERECO,
      UF,
      CIDADE,
      FONE_FIXO,
      FONE_CELULAR,
      LINKEDIN,
      ESCOLARIDADE,
      ID_AREA_ATUACAO,
      CURRICULO_RESUMIDO,
      CAMINHO_FOTO,
    } = req.body;

    const { ID_USUARIO } = req.params;

    // updating mentor data
    await Mentor.update(
      {
        CPF,
        DT_NASCIMENTO: parseStringToDate(DT_NASCIMENTO),
        SEXO,
        CEP,
        ENDERECO,
        UF,
        CIDADE,
        FONE_FIXO,
        FONE_CELULAR,
        LINKEDIN,
        ESCOLARIDADE,
        ID_AREA_ATUACAO: ID_AREA_ATUACAO ? Number(ID_AREA_ATUACAO) : undefined,
        CURRICULO_RESUMIDO,
        CAMINHO_FOTO,
      },
      { where: { ID_MENTOR: ID_USUARIO } }
    ).then((r) => {
      return res.json({ ID_USUARIO });
    });
  }
}

export default MentorController;
