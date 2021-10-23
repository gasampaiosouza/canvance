import { Request, Response } from 'express';

import DoneTask from 'models/completed-task.model';
import { ObjectId } from 'mongoose';

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

    return res
      .status(400)
      .send({ error: 'Não foi possível criar uma tarefa completa' });
  }
}

async function getDoneTaskByCategoryIdController(
  req: Request<{ id?: ObjectId }>,
  res: Response
) {
  try {
    const userId = req.params.id;
    const tasks = await DoneTask.find({ userId }).populate('task');

    return (
      res
        .status(200)
        // @ts-ignore
        .send(tasks.sort((x, y) => y.task.relevance - x.task.relevance))
    );
  } catch (error) {
    console.log(error);

    return res
      .status(400)
      .send({ error: 'Não foi possível listar a tarefa completa' });
  }
}

async function getDoneTaskByIdController(req: Request, res: Response) {
  try {
    const tasks = (await DoneTask.findById(req.params.taskId)) || [];

    return res.status(200).send(tasks);
  } catch (error) {
    console.log(error);

    return res
      .status(400)
      .send({ error: 'Não foi possível listar a tarefa completa' });
  }
}

async function updateDoneTaskByIdController(req: Request, res: Response) {
  try {
    const task = await DoneTask.findByIdAndUpdate(req.params.taskId, req.body, {
      new: true,
    });

    return res.status(202).send(task);
  } catch (error) {
    console.log(error);

    return res
      .status(400)
      .send({ error: 'Não foi possível atualizar a tarefa completa' });
  }
}

async function deleteDoneTaskByIdController(req: Request, res: Response) {
  try {
    const tasks = await DoneTask.findByIdAndRemove(req.params.taskId);

    return res.status(202).send();
  } catch (error) {
    console.log(error);

    return res
      .status(400)
      .send({ error: 'Não foi possível remover a tarefa completa' });
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
