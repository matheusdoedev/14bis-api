import { Request, Response, NextFunction } from 'express';

import User from '../app/models/User';

export default async function checkUserActivity(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { ID_USUARIO } = req.params;

  // finding user
  const user = await User.findOne({ where: { ID_USUARIO } });

  // check if this user exists or his account is active
  if (user?.getDataValue('SN_ATIVO') === 'N' || !user) {
    return res
      .status(400)
      .json({ message: 'Mentor inativo ou esse usuário não existe.' });
  } else {
    next();
  }
}
