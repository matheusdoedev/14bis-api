import { Request, Response } from 'express';

import generateToken from '../../utils/generateToken';

import User from '../models/User';

class SessionController {
  static async postUserAuthentication(req: Request, res: Response) {
    let { EMAIL_LOGIN, SENHA } = req.body;

    // searching in database if a user with this email send on red.body exists
    const user = await User.findOne({
      where: {
        EMAIL_LOGIN,
      },
    }).then((r) => r?.get());

    // checks if haven't found a valid email
    if (!user) {
      return res
        .status(400)
        .send({ error: 'Usuário não encontrado/e-mail inválido' });
    }

    // check if the "SENHA" is valid
    if (user.SENHA !== SENHA) {
      return res.status(400).json({ message: 'Senha incorreta.' });
    }

    const token = generateToken({ id: user.ID_USUARIO });

    // reseting req.body password
    SENHA = undefined;

    return res.json({
      user_id: user.ID_USUARIO,
      perfil: user.ID_PERFIL,
      sn_ativo: user.SN_ATIVO,
      token,
    });
  }
}

export default SessionController;
