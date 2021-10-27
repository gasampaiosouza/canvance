import { Request, Response } from 'express';

import User from '../models/user.model';

// req.userId

async function getUserByTokenController(req: Request, res: Response) {
  try {
    // @ts-ignore
    const user = await User.findById(req.userId).populate('category');

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
