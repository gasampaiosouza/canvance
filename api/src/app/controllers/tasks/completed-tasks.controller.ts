import { handleMissingFields } from '@/utils/handle-missing-fields';
import { Request, Response } from 'express';

import mongoose from 'mongoose';

import DoneTask from 'models/completed-task.model';
import User from 'models/user.model';
import Task from 'models/task.model';

// req.userId

async function getAllDoneTasks(req: Request, res: Response) {
  try {
    // sort by createdAt and status as done
    const tasks = await DoneTask.find().populate('newTask').populate('user');

    return res.status(200).send(tasks);
  } catch (error) {
    console.log(error);

    return res.status(400).send({ error: 'Não foi possível listar as tarefas completas' });
  }
}

async function createDoneTasks(req: Request, res: Response) {
  const isValidTaskId = mongoose.isValidObjectId(req.body.newTask || '');
  const isValidUserId = mongoose.isValidObjectId(req.body.user || '');

  if (!isValidTaskId || !isValidUserId) {
    res.status(400).send({ error: 'O ID não é válido' });
    return;
  }

  const { isMissingFields, fieldsMissing } = handleMissingFields(
    ['newTask', 'user', 'status'],
    req.body
  );

  if (isMissingFields) {
    res.status(422).send({ error: 'fields.missing', fields: fieldsMissing });
    return;
  }

  try {
    const userExists = await User.findOne({ _id: req.body.user });

    if (!userExists) {
      return res.status(400).send({ error: 'Usuário não encontrado' });
    }

    const taskExists = await Task.findOne({ _id: req.body.newTask });

    if (!taskExists) {
      return res.status(400).send({ error: 'Tarefa não encontrada' });
    }

    const completedTaskExists = await DoneTask.findOne({
      user: req.body.user,
      newTask: req.body.newTask,
    });

    if (completedTaskExists) {
      res.status(400).send({ error_message: 'A tarefa já foi atribuída a este usuário' });
      return;
    }

    const task = await DoneTask.create(req.body);
    const populatedTask = await task.populate([
      { path: 'newTask', populate: { path: 'category' } },
    ]);

    return res.status(201).send(populatedTask);
  } catch (error) {
    console.log(error);

    return res.status(400).send({ error: 'Não foi possível criar uma tarefa' });
  }
}

async function getDoneTaskById(req: Request<{ taskId: string }>, res: Response) {
  if (!mongoose.isValidObjectId(req.params.taskId || '')) {
    res.status(400).send({ error: 'O ID da task não é válido' });
    return;
  }

  try {
    const tasks = await DoneTask.findById(req.params.taskId);

    return res.status(200).send(tasks);
  } catch (error) {
    console.log(error);

    return res.status(400).send({ error: 'Não foi possível listar a tarefa' });
  }
}

async function updateDoneTaskById(req: Request<{ taskId: string }>, res: Response) {
  if (!mongoose.isValidObjectId(req.params.taskId || '')) {
    res.status(400).send({ error: 'O ID da task não é válido' });
    return;
  }

  try {
    const task = await DoneTask.findByIdAndUpdate(req.params.taskId, req.body, {
      new: true,
    });

    return res.status(202).send(task);
  } catch (error) {
    console.log(error);

    return res.status(400).send({ error: 'Não foi possível atualizar a tarefa' });
  }
}

async function deleteDoneTaskById(req: Request<{ taskId: string }>, res: Response) {
  if (!mongoose.isValidObjectId(req.params.taskId || '')) {
    res.status(400).send({ error: 'O ID da task não é válido' });
    return;
  }

  try {
    const response = await DoneTask.deleteOne({ newTask: req.params.taskId });

    return res.status(202).send();
  } catch (error) {
    console.log(error);

    return res.status(400).send({ error: 'Não foi possível remover a tarefa' });
  }
}

const exportData = {
  find: getAllDoneTasks,
  create: createDoneTasks,
  // getByCategory: getDoneTaskByCategoryId,
  getById: getDoneTaskById,
  updateById: updateDoneTaskById,
  deleteById: deleteDoneTaskById,
};

export default exportData;
