import mongoose from 'mongoose';
import { handleMissingFields } from '@/utils/handle-missing-fields';
import { Request, Response } from 'express';

import User from 'models/user.model';
import DoneTask from 'models/completed-task.model';
import { omit } from 'lodash';

// req.userId

async function updateUserByIdController(req: Request, res: Response) {
  if (!mongoose.isValidObjectId(req.params.userId || '')) {
    res.status(400).send({ error: 'O ID do usuário não é válido' });
    return;
  }

  const { isMissingFields, fieldsMissing } = handleMissingFields(
    ['name', 'email', 'category', 'permissionLevel'],
    req.body
  );

  if (isMissingFields) {
    res.status(422).send({ error: 'fields.missing', fields: fieldsMissing });
    return;
  }

  try {
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      omit(req.body, 'password'),
      { new: true }
    ).populate('category');

    return res.status(200).send(user);
  } catch (error) {
    console.log(error);

    return res.status(400).send({ error: 'Não foi possível atualizar o usuário' });
  }
}

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

async function deleteUserByIdController(req: Request, res: Response) {
  if (!mongoose.isValidObjectId(req.params.userId || '')) {
    res.status(400).send({ error: 'O ID do usuário não é válido' });
    return;
  }

  try {
    await User.findByIdAndDelete(req.params.userId);

    // delete all user's tasks
    await DoneTask.deleteMany({ userId: req.params.userId });

    return res.status(200).send({ message: 'Usuário apagado com sucesso' });
  } catch (error) {
    console.log(error);

    return res.status(400).send({ error: 'Não foi possível apagar o usuário' });
  }
}

async function getAllUsersController(req: Request, res: Response) {
  try {
    const users = await User.find().populate('category');

    return res.status(200).send(users);
  } catch (error) {
    console.log(error);

    return res.status(400).send({ error: 'Não foi possível listar os usuários' });
  }
}

const exportData = {
  find: getAllUsersController,
  getByToken: getUserByTokenController,
  updateById: updateUserByIdController,
  deleteById: deleteUserByIdController,
};

export default exportData;
