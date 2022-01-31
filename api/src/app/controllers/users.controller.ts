import mongoose from 'mongoose';
import { handleMissingFields } from '@/utils/handle-missing-fields';
import { Request, Response } from 'express';

import User from 'models/user.model';
import DoneTask from 'models/completed-task.model';
import { omit } from 'lodash';
import Task from '../models/task.model';

// req.userId

async function updateUserById(req: Request, res: Response) {
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
    if (typeof req.body.category == 'string') {
      req.body.category = req.body.category.split(',');
    }

    const user = await User.findByIdAndUpdate(
      req.params.userId,
      omit(req.body, 'password'),
      { new: true }
    )
      .populate('category')
      .populate('manager');

    return res.status(200).send(user);
  } catch (error) {
    console.log(error);

    return res.status(400).send({ error: 'Não foi possível atualizar o usuário' });
  }
}

async function getUserByToken(req: Request, res: Response) {
  try {
    // @ts-ignore
    const user = await User.findById(req.userId).populate('category').populate('manager');

    return res.status(200).send(user);
  } catch (error) {
    console.log(error);

    return res.status(400).send({ error: 'Não foi possível obter o usuário' });
  }
}

async function deleteUserById(req: Request, res: Response) {
  if (!mongoose.isValidObjectId(req.params.userId || '')) {
    res.status(400).send({ error: 'O ID do usuário não é válido' });
    return;
  }

  try {
    await User.findByIdAndDelete(req.params.userId);

    // delete all user's tasks
    await DoneTask.deleteMany({ userId: req.params.userId });

    return res.status(200).send({ message: 'Usuário removido com sucesso' });
  } catch (error) {
    console.log(error);

    return res.status(400).send({ error: 'Não foi possível remover o usuário' });
  }
}

async function getAllUsers(req: Request, res: Response) {
  try {
    const users = await User.find().populate('category').populate('manager');

    return res.status(200).send(users);
  } catch (error) {
    console.log(error);

    return res.status(400).send({ error: 'Não foi possível listar os usuários' });
  }
}

async function getUserTasks(req: Request, res: Response) {
  try {
    // @ts-ignore
    const user = await User.findById(req.userId);

    const taskMergedFieldName = 'task_info';

    // basically, gets taskId from table 'tasks-done'
    // and merges it into the tasks table
    const tasks = await Task.aggregate([
      {
        $lookup: {
          from: 'completed-tasks',
          let: { id: '$_id', categoryId: '$category' },
          as: taskMergedFieldName,
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    // @ts-ignore
                    // { $eq: ['$$categoryId', { $toObjectId: user.category }] },
                    { $eq: ['$newTask', '$$id'] },
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
            $mergeObjects: [{ $arrayElemAt: [`$${taskMergedFieldName}`, 0] }, '$$ROOT'],
          },
        },
      },

      // { $sort: { createdAt: -1 } },

      {
        $project: {
          _id: 1,
          title: 1,
          description: 1,
          relevance: 1,
          category: 1,
          status: { $ifNull: ['$status', null] },
          createdAt: 1,
        },
      },
    ]);

    Task.populate(tasks, { path: 'category' }, (err, tasks) => {
      const filteredTasks = tasks.filter((task) => {
        return user?.category.some((categoryId) =>
          task.category.some((taskCategoryId) => {
            // @ts-ignore
            const hasSameId = taskCategoryId._id.toString() === categoryId.toString();

            return hasSameId;
          })
        );
      });

      if (err) {
        return res.status(400).send({ error: 'Não foi possível listar as tarefas' });
      }

      return res.status(200).send(filteredTasks);
    });
  } catch (error) {
    console.log(error);

    return res.status(400).send({ error: 'Não foi possível listar a tarefa' });
  }
}

const exportData = {
  find: getAllUsers,
  getByToken: getUserByToken,
  updateById: updateUserById,
  deleteById: deleteUserById,
  getUserTasks: getUserTasks,
};

export default exportData;
