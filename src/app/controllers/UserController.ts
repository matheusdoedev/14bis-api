import { Request, Response } from "express";
// utils
import generateToken from "../../utils/generateToken";
// models
import User from "../models/User";

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

      console.log({
        NOME_COMPLETO,
        EMAIL_LOGIN,
        FONE_LOGIN,
        SENHA,
        ID_PERFIL,
        SN_ATIVO,
      });

      // password must be more than or equal 6 characters
      if (SENHA.length < 6) {
        return res.status(400).send({
          error: "A senha deve ter pelo menos 6 caracteres",
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

      // saving user data on users migration
      const insertedUser = await User.create(user).then((r) => r.get());

      // getting registered user ID_USUARIO
      const userId = insertedUser.ID_USUARIO;

      // token
      const token = generateToken({ ID_USUARIO: userId });

      // reseting req.body password
      SENHA = undefined;

      return res.json({ user_id: userId, token, ID_PERFIL, SN_ATIVO });
    } catch (error) {
      console.log(error);
      return res.status(400).send({ error: "Erro ao criar usuário" });
    }
  }
}

export default UsersController;
