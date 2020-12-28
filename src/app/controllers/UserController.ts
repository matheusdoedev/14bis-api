import { Request, Response } from 'express';

import generateToken from '../../utils/generateToken';

import User from '../models/User';

class UsersController {
  static async postUserCreate(req: Request, res: Response) {
    let {
      NOME_COMPLETO,
      EMAIL_LOGIN,
      FONE_LOGIN,
      SENHA,
      ID_PERFIL,
      SN_ATIVO,
    } = req.body;

    // password must be more than or equal 6 characters
    if (SENHA.length < 6) {
      return res.status(400).send({
        error: 'A senha deve ter pelo menos 6 caracteres',
      });
    }

    // saving user data on users migration and getting registered user id
    await User.create({
      NOME_COMPLETO,
      EMAIL_LOGIN,
      SENHA,
      FONE_LOGIN,
      ID_PERFIL,
      SN_ATIVO,
    }).then((r) => {
      // token
      const token = generateToken({ ID_USUARIO: r.getDataValue('ID_USUARIO') });

      // reseting req.body password
      SENHA = undefined;

      return res.json({
        user_id: r.getDataValue('ID_USUARIO'),
        token,
        ID_PERFIL,
        SN_ATIVO,
      });
    });
  }

  static async getUserData(req: Request, res: Response) {
    const { ID_USUARIO } = req.params;

    // searching in database if a user with this email send on red.body exists
    await User.findOne({
      where: {
        ID_USUARIO,
      },
    }).then((r) => {
      if (!r?.get()) {
        return res.status(400).json({ message: 'Erro ao obter usuário' });
      }

      return res.json({ user: r?.get() });
    });
  }

  static async putUserData(req: Request, res: Response) {
    let { NOME_COMPLETO, EMAIL_LOGIN, FONE_LOGIN, SENHA } = req.body;

    const { ID_USUARIO } = req.params;

    // updating user data
    await User.update(
      {
        NOME_COMPLETO,
        EMAIL_LOGIN,
        FONE_LOGIN,
        SENHA,
      },
      {
        where: {
          ID_USUARIO,
        },
      }
    ).then((r) => {
      SENHA = undefined;

      return res.json({ message: 'Usuário atualizado' });
    });
  }
}

export default UsersController;
