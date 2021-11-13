import jwt from 'jsonwebtoken';
import authConfig from '@config/auth.json';

import { NextFunction, Request, Response } from 'express';
import { isValidToken } from '@/utils/validate-jwt';

export default (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  const { token = '', isValid, message } = isValidToken(authHeader || '');

  if (!isValid) {
    return res.status(401).send({ error: message });
  }

  jwt.verify(token, authConfig.secret, (err, decoded) => {
    if (err) {
      console.error(err);

      return res.status(401).send({ error: 'Token inválido' });
    }

    // @ts-ignore
    req.userId = decoded.id;

    // @ts-ignore
    req.userPermissionLevel = decoded.permissionLevel;

    return next();
  });
};
