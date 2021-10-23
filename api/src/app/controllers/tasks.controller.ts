import { Request, Response } from 'express';
import mongoose from 'mongoose';

import Task from '../models/task.model';

// req.userId

async function getAllTasksController(req: Request, res: Response) {
  try {
    const tasks = await Task.find();

    return res.status(200).send(tasks);
  } catch (error) {
    console.log(error);

    return res
      .status(400)
      .send({ error: 'Não foi possível listar as tarefas' });
  }
}

async function createTasksController(req: Request, res: Response) {
  try {
    const task = await Task.create(req.body);

    return res.status(201).send(task);
  } catch (error) {
    console.log(error);

    return res.status(400).send({ error: 'Não foi possível criar uma tarefa' });
  }
}

async function getTaskByCategoryIdController(
  req: Request<{ id?: string }>,
  res: Response
) {
  if (!req.params.id) {
    res.status(400).send({ error: 'Missing category id' });
  }

  try {
    const taskMergedFieldName = 'task_info';

    // basically, gets taskId from table 'tasks-done'
    // and merges it into the tasks table
    const tasks = await Task.aggregate([
      {
        $lookup: {
          from: 'completed-tasks',
          localField: '_id',
          foreignField: 'taskId',
          as: taskMergedFieldName,
        },
      },
      {
        $match: {
          category: new mongoose.Types.ObjectId(req.params.id),
        },
      },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: [
              { $arrayElemAt: [`$${taskMergedFieldName}`, 0] },
              '$$ROOT',
            ],
          },
        },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          // userId: 1,
          description: 1,
          relevance: 1,
          status: { $ifNull: ['$status', null] },
          createdAt: 1,
        },
      },
      { $project: { fromItems: 0 } },
      { $unset: [taskMergedFieldName, '__v'] },
      { $sort: { status: -1, relevance: -1 } },
    ]);

    // const currentUserTasks = tasks.filter((task) => {
    //   // @ts-ignore
    //   return get(task, 'userId')?.toString() == req.userId;
    // });

    return res.status(200).send(tasks);
  } catch (error) {
    console.log(error);

    return res.status(400).send({ error: 'Não foi possível listar a tarefa' });
  }
}

async function getTaskByIdController(req: Request, res: Response) {
  try {
    const tasks = (await Task.findById(req.params.taskId)) || [];

    return res.status(200).send(tasks);
  } catch (error) {
    console.log(error);

    return res.status(400).send({ error: 'Não foi possível listar a tarefa' });
  }
}

async function updateTaskByIdController(req: Request, res: Response) {
  try {
    const task = await Task.findByIdAndUpdate(req.params.taskId, req.body);

    return res.status(202).send(task);
  } catch (error) {
    console.log(error);

    return res
      .status(400)
      .send({ error: 'Não foi possível atualizar a tarefa' });
  }
}

async function deleteTaskByIdController(req: Request, res: Response) {
  try {
    const tasks = await Task.findByIdAndRemove(req.params.taskId);

    return res.status(202).send();
  } catch (error) {
    console.log(error);

    return res.status(400).send({ error: 'Não foi possível remover a tarefa' });
  }
}

const exportData = {
  find: getAllTasksController,
  create: createTasksController,
  getById: getTaskByIdController,
  getByCategory: getTaskByCategoryIdController,
  updateById: updateTaskByIdController,
  deleteById: deleteTaskByIdController,
};

export default exportData;
