import { Express, Request, Response } from 'express';

import authMiddleware from 'middlewares/auth.middleware';

// controllers
import Auth from 'controllers/auth.controller';
import Users from 'controllers/users.controller';
import Tasks from 'controllers/tasks.controller';
import TasksDone from 'controllers/completed-tasks.controller';
import Categories from 'controllers/categories.controller';

export default function (app: Express) {
  // healthcheck
  app.get('/healthcheck', (req: Request, res: Response) => res.status(200));

  // authentication
  app.post('/auth/register', Auth.register);
  app.post('/auth/login', Auth.login);
  app.post('/auth/forgot_password', Auth.forgotPassword);
  app.post('/auth/reset_password', Auth.resetPassword);

  // users
  app.get('/users/token/:token', Users.getByToken);

  // categories
  app.get('/category', authMiddleware, Categories.find);
  app.post('/category', authMiddleware, Categories.create);
  app.get('/category/:categoryId', authMiddleware, Categories.getById);
  app.put('/category/:categoryId', authMiddleware, Categories.updateById);
  app.delete('/category/:categoryId', authMiddleware, Categories.deleteById);

  // tasks
  app.get('/tasks', authMiddleware, Tasks.find);
  app.post('/tasks', authMiddleware, Tasks.create);
  app.get('/tasks/:taskId', authMiddleware, Tasks.getById);
  app.get('/tasks/category/:id', authMiddleware, Tasks.getByCategory);
  app.put('/tasks/:taskId', authMiddleware, Tasks.updateById);
  app.delete('/tasks/:taskId', authMiddleware, Tasks.deleteById);

  // completed tasks
  app.get('/tasks-done', authMiddleware, TasksDone.find);
  app.post('/tasks-done', authMiddleware, TasksDone.create);
  app.get('/tasks-done/user/:id', authMiddleware, TasksDone.getByCategory);
  app.get('/tasks-done/:taskId', authMiddleware, TasksDone.getById);
  app.put('/tasks-done/:taskId', authMiddleware, TasksDone.updateById);
  app.delete('/tasks-done/:taskId', authMiddleware, TasksDone.deleteById);
}
