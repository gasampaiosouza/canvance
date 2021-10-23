import jwt from 'jsonwebtoken';
import authConfig from '@config/auth.json';

import { NextFunction, Request, Response } from 'express';

export default (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).send({ error: 'Você não tem autorização.' });
    return;
  }

  // Bearer <<token>>
  const [scheme, token] = authHeader.split(' ');
  const isValidToken = /^Bearer$/i.test(scheme);

  if (!isValidToken || !token) {
    res.status(401).send({ error: 'Erro ao ler o token de autorização.' });
    return;
  }

  jwt.verify(token, authConfig.secret, (err, decoded) => {
    if (err) {
      console.error(err);

      return res.status(401).send({ error: 'Token inválido' });
    }

    // @ts-ignore
    req.userId = decoded.id;

    return next();
  });
};
