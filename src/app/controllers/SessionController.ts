import { Request, Response } from "express";
// utils
import generateToken from "../../utils/generateToken";
// models
import User from "../models/User";

class SessionController {
    static async postUserAuthentication(req: Request, res: Response) {
        try {
            let { EMAIL_LOGIN, SENHA } = req.body;

            // searching in database if a user with this email send on red.body exists
            const user = await User.findAll({
                where: {
                    EMAIL_LOGIN,
                },
            });

            // checks if haven't found a valid email
            if (user.length <= 0) {
                return res.status(400).send({ error: "Usuário não encontrado/e-mail inválido" });
            }

            if (user[0].getDataValue("SENHA") !== SENHA) {
                return res.status(400).send({ error: "Senha incorreta." });
            }

            // token
            const token = generateToken({ id: user[0].getDataValue("ID_USUARIO") });

            // reseting req.body password
            SENHA = undefined;

            return res.json({
                user_id: user[0].getDataValue("ID_USUARIO"),
                perfil: user[0].getDataValue("ID_PERFIL"),
                sn_ativo: user[0].getDataValue("SN_ATIVO"),
                token,
            });
        } catch (error) {
            console.log(error);
            return res.status(400).send({ error: "Erro de autenticação de usuário" });
        }
    }
}

export default SessionController;