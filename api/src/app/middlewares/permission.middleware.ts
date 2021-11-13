import { NextFunction, Request, Response } from 'express';

export default (req: Request, res: Response, next: NextFunction) => {
  // @ts-ignore
  const userPermissionLevel = req.userPermissionLevel;

  if (userPermissionLevel > 1) {
    return res.status(401).json({ error: 'Você não tem permissão' });
  }

  return next();
};
