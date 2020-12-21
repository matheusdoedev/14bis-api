import { Request, Response } from 'express';
// utils
import generateToken from '../../utils/generateToken';
// models
import User from '../models/User';

class UsersController {
  static async postUserCreate(req: Request, res: Response) {
    try {
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

      // user
      const user = {
        NOME_COMPLETO,
        EMAIL_LOGIN,
        // encrypting user password before save in database with bcryptjs
        SENHA,
        FONE_LOGIN,
        ID_PERFIL,
        SN_ATIVO,
      };

      // saving user data on users migration and getting registered user id
      const insertedUser = await User.create(user).then((r) => r.get());

      // token
      const token = generateToken({ ID_USUARIO: insertedUser.ID_USUARIO });

      // reseting req.body password
      SENHA = undefined;

      return res.json({
        user_id: insertedUser.ID_USUARIO,
        token,
        ID_PERFIL,
        SN_ATIVO,
      });
    } catch (err) {
      return res.status(400).json({ message: 'Erro ao criar o usuário', err });
    }
  }

  static async getUserData(req: Request, res: Response) {
    const { ID_USUARIO } = req.params;

    // searching in database if a user with this email send on red.body exists
    const user = await User.findOne({
      where: {
        ID_USUARIO,
      },
    }).then((r) => r?.get());

    // check if user exists
    if (!user) {
      return res.status(400).json({ message: 'Erro ao obter usuário' });
    }

    return res.json({ ...user });
  }

  static async putUserData(req: Request, res: Response) {
    let { NOME_COMPLETO, EMAIL_LOGIN, FONE_LOGIN, SENHA } = req.body;

    const { ID_USUARIO } = req.params;

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
    );

    // reseting req.body password
    SENHA = undefined;

    return res.json({ message: 'Usuário atualizado' });
  }
}

export default UsersController;
