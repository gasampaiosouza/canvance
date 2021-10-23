import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import User from '../models/user.model';

// req.userId

async function getUserByTokenController(req: Request, res: Response) {
  try {
    const isWellFormatted = req.params.token.split('.').length === 3;
    const hasNoSpaces = req.params.token.split(' ').length === 1;

    if (!isWellFormatted || !hasNoSpaces) {
      res.status(400).send({ error: 'Token inválido' });
      return;
    }

    const parsedToken = jwt.decode(req.params.token, { json: true });
    const userId = parsedToken?.id;

    const user = (await User.findById(userId)) || [];

    return res.status(200).send(user);
  } catch (error) {
    console.log(error);

    return res.status(400).send({ error: 'Não foi possível obter o usuário' });
  }
}

const exportData = {
  getByToken: getUserByTokenController,
};

export default exportData;
