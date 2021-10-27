import { handleMissingFields } from '@/utils/handle-missing-fields';
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
  const { isMissingFields, fieldsMissing } = handleMissingFields(
    ['title', 'description', 'relevance', 'category'],
    req.body
  );

  if (isMissingFields) {
    res.status(422).send({ error: 'fields.missing', fields: fieldsMissing });
    return;
  }

  try {
    const task = await Task.create(req.body);

    return res.status(201).send(task);
  } catch (error) {
    console.log(error);

    return res.status(400).send({ error: 'Não foi possível criar uma tarefa' });
  }
}

async function getTaskByCategoryController(
  req: Request<{ categoryId?: string }>,
  res: Response
) {
  if (!mongoose.isValidObjectId(req.params.categoryId || '')) {
    res.status(400).send({ error: 'O ID da categoria não é válido' });
    return;
  }

  try {
    const taskMergedFieldName = 'task_info';

    // basically, gets taskId from table 'tasks-done'
    // and merges it into the tasks table
    const tasks = await Task.aggregate([
      {
        $lookup: {
          from: 'completed-tasks',
          let: { id: '$_id' },
          as: taskMergedFieldName,
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ['$taskId', '$$id'] },
                    {
                      // @ts-ignore
                      $eq: ['$userId', { $toObjectId: req.userId }],
                    },
                  ],
                },
              },
            },
          ],
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
          description: 1,
          relevance: 1,
          status: { $ifNull: ['$status', null] },
          createdAt: 1,
        },
      },
      { $sort: { status: -1, relevance: -1 } },
    ]);

    return res.status(200).send(tasks);
  } catch (error) {
    console.log(error);

    return res.status(400).send({ error: 'Não foi possível listar a tarefa' });
  }
}

async function getTaskByIdController(
  req: Request<{ taskId: string }>,
  res: Response
) {
  if (!mongoose.isValidObjectId(req.params.taskId || '')) {
    res.status(400).send({ error: 'O ID da categoria não é válido' });
    return;
  }

  try {
    const tasks = (await Task.findById(req.params.taskId)) || [];

    return res.status(200).send(tasks);
  } catch (error) {
    console.log(error);

    return res.status(400).send({ error: 'Não foi possível listar a tarefa' });
  }
}

async function updateTaskByIdController(
  req: Request<{ taskId: string }>,
  res: Response
) {
  if (!mongoose.isValidObjectId(req.params.taskId || '')) {
    res.status(400).send({ error: 'O ID da categoria não é válido' });
    return;
  }

  const { isMissingFields, fieldsMissing } = handleMissingFields(
    ['title', 'description', 'relevance', 'category'],
    req.body
  );

  if (isMissingFields) {
    res.status(422).send({ error: 'fields.missing', fields: fieldsMissing });
    return;
  }

  try {
    const task = await Task.findByIdAndUpdate(req.params.taskId, req.body, {
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

async function deleteTaskByIdController(
  req: Request<{ taskId: string }>,
  res: Response
) {
  if (!mongoose.isValidObjectId(req.params.taskId || '')) {
    res.status(400).send({ error: 'O ID da categoria não é válido' });
    return;
  }

  try {
    await Task.findByIdAndRemove(req.params.taskId);

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
  getByCategory: getTaskByCategoryController,
  updateById: updateTaskByIdController,
  deleteById: deleteTaskByIdController,
};

export default exportData;
