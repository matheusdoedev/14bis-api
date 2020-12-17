import { Request, Response } from 'express';
// utils
import parseStringToDate from '../../utils/parseStringToDate';
// models
import Mentor from '../models/Mentor';
import User from '../models/User';

class MentorController {
  static async postCreateMentor(req: Request, res: Response) {
    try {
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
      const insertedMentor = await Mentor.create({
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
      });

      // getting registered ID_MENTOR
      const mentorId = insertedMentor.getDataValue('ID_MENTOR');

      return res.json({
        mentorId,
      });
    } catch (err) {
      return res.status(400).json({ message: 'Erro ao criar Mentor', err });
    }
  }

  static async getMentorData(req: Request, res: Response) {
    try {
      let { ID_USUARIO } = req.params;

      // searching in database if a Mentor with this ID_MENTOR send on red.body exists
      const mentor = await Mentor.findOne({
        where: {
          ID_MENTOR: ID_USUARIO,
        },
      }).then((r) => r?.get());

      return res.json({ ...mentor });
    } catch (err) {
      return res.status(400).json({ message: 'Erro ao obter Mentor', err });
    }
  }

  static async putMentorData(req: Request, res: Response) {
    try {
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
          ID_AREA_ATUACAO: Number(ID_AREA_ATUACAO),
          CURRICULO_RESUMIDO,
          CAMINHO_FOTO,
        },
        { where: { ID_MENTOR: ID_USUARIO } }
      );

      return res.json({ ID_USUARIO });
    } catch (err) {
      return res.status(400).json({ message: 'Erro ao obter Mentor', err });
    }
  }
}

export default MentorController;
