import { Express, Request, Response } from 'express';

import MAuth from 'middlewares/auth.middleware';
import MPermission from 'middlewares/permission.middleware';

// controllers
import Auth from 'controllers/auth.controller';
import Users from 'controllers/users.controller';
import Tasks from '@/app/controllers/tasks/tasks.controller';
import TasksDone from 'controllers/tasks/completed-tasks.controller';
import Categories from 'controllers/categories.controller';
import Questions from 'controllers/questions/questions.controller';
import ASWQuestions from 'controllers/questions/answered-questions.controller';

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
  app.get('/user/tasks', MAuth, Users.getUserTasks);
  app.put('/user/profile/:userId', [MAuth, MPermission], Users.updateById);
  app.delete('/user/:userId', [MAuth, MPermission], Users.deleteById);

  // categories
  app.get('/category', MAuth, Categories.find);
  app.get('/category/:categoryId', MAuth, Categories.getById);
  app.post('/category', [MAuth, MPermission], Categories.create);
  app.put('/category/:categoryId', [MAuth, MPermission], Categories.updateById);
  app.delete('/category/:categoryId', [MAuth, MPermission], Categories.deleteById);

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

  // questions
  app.get('/questions', [MAuth, MPermission], Questions.find);
  app.get('/questions/:questionId', [MAuth, MPermission], Questions.getById);
  app.get('/questions/category/:categoryId', MAuth, Questions.getByCategory);
  app.post('/questions', [MAuth, MPermission], Questions.create);
  app.put('/questions/:questionId', [MAuth, MPermission], Questions.updateById);
  app.delete('/questions/:questionId', [MAuth, MPermission], Questions.deleteById);

  // answered questions
  app.get('/questions-answered', [MAuth, MPermission], ASWQuestions.find);
  app.get('/questions-answered/:questionId', [MAuth, MPermission], ASWQuestions.getById);
  app.get('/questions-answered/user/:userId', [MAuth, MPermission], ASWQuestions.getByUserId);
  app.post('/questions-answered', [MAuth, MPermission], ASWQuestions.create);
  app.put('/questions-answered/:questionId', [MAuth, MPermission], ASWQuestions.updateById);
  app.delete('/questions-answered/:questionId', [MAuth, MPermission], ASWQuestions.deleteById);
}
