import { Express, Request, Response } from 'express';

import MAuth from 'middlewares/auth.middleware';
import MPermission from 'middlewares/permission.middleware';

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
  app.post('/auth/register', [MAuth, MPermission], Auth.register);
  app.post('/auth/login', Auth.login);
  app.post('/auth/forgot_password', Auth.forgotPassword);
  app.post('/auth/reset_password', Auth.resetPassword);

  // user
  app.get('/users', [MAuth, MPermission], Users.find);
  app.get('/user/profile', MAuth, Users.getByToken);
  app.get('/user/tasks-done', MAuth, TasksDone.getByCategory);
  // app.put('/user/profile/:userId', MAuth, Users.updateById);
  app.delete('/user/:userId', [MAuth, MPermission], Users.deleteById);

  // categories
  app.get('/category', MAuth, Categories.find);
  app.get('/category/:categoryId', MAuth, Categories.getById);
  app.post('/category', [MAuth, MPermission], Categories.create);
  app.put('/category/:categoryId', [MAuth, MPermission], Categories.updateById);
  app.delete('/category/:categoryId', MAuth, Categories.deleteById);

  // tasks
  app.get('/tasks', MAuth, Tasks.find);
  app.get('/tasks/:taskId', MAuth, Tasks.getById);
  app.get('/tasks/category/:categoryId', MAuth, Tasks.getByCategory);
  app.post('/tasks', [MAuth, MPermission], Tasks.create);
  app.put('/tasks/:taskId', [MAuth, MPermission], Tasks.updateById);
  app.delete('/tasks/:taskId', [MAuth, MPermission], Tasks.deleteById);

  // completed tasks
  app.get('/tasks-done', MAuth, TasksDone.find);
  app.get('/tasks-done/:taskId', MAuth, TasksDone.getById);
  app.post('/tasks-done', MAuth, TasksDone.create);
  app.put('/tasks-done/:taskId', MAuth, TasksDone.updateById);
  app.delete('/tasks-done/:taskId', MAuth, TasksDone.deleteById);
}
