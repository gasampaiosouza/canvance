import { Request, Response } from 'express';

import DoneTask from 'models/completed-task.model';
import mongoose from 'mongoose';

// req.userId

async function getAllDoneTasksController(req: Request, res: Response) {
  try {
    const tasks = await DoneTask.find();

    return res.status(200).send(tasks);
  } catch (error) {
    console.log(error);

    return res
      .status(400)
      .send({ error: 'Não foi possível listar as tarefas completas' });
  }
}

async function createDoneTasksController(req: Request, res: Response) {
  try {
    const task = await DoneTask.create(req.body);

    return res.status(201).send(task);
  } catch (error) {
    console.log(error);

    return res.status(400).send({ error: 'Não foi possível criar uma tarefa' });
  }
}

async function getDoneTaskByCategoryIdController(req: Request, res: Response) {
  try {
    // @ts-ignore
    const tasks = await DoneTask.find({ userId: req.userId });

    return res.status(200).send(tasks);
  } catch (error) {
    console.log(error);

    return res.status(400).send({ error: 'Não foi possível listar a tarefa' });
  }
}

async function getDoneTaskByIdController(
  req: Request<{ taskId: string }>,
  res: Response
) {
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

async function updateDoneTaskByIdController(
  req: Request<{ taskId: string }>,
  res: Response
) {
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

    return res
      .status(400)
      .send({ error: 'Não foi possível atualizar a tarefa' });
  }
}

async function deleteDoneTaskByIdController(
  req: Request<{ taskId: string }>,
  res: Response
) {
  if (!mongoose.isValidObjectId(req.params.taskId || '')) {
    res.status(400).send({ error: 'O ID da task não é válido' });
    return;
  }

  try {
    await DoneTask.findByIdAndRemove(req.params.taskId);

    return res.status(202).send();
  } catch (error) {
    console.log(error);

    return res.status(400).send({ error: 'Não foi possível remover a tarefa' });
  }
}

const exportData = {
  find: getAllDoneTasksController,
  create: createDoneTasksController,
  getByCategory: getDoneTaskByCategoryIdController,
  getById: getDoneTaskByIdController,
  updateById: updateDoneTaskByIdController,
  deleteById: deleteDoneTaskByIdController,
};

export default exportData;
