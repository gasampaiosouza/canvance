import { Request, Response } from 'express';
import { omit } from 'lodash';
import User from '../models/user.model';

import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import authConfig from '@config/auth.json';
import transport from '@/modules/mailer';

function generateToken(params: Record<string, unknown>) {
  const token = jwt.sign(params, authConfig.secret, {
    expiresIn: 86400,
  });

  return token;
}

// register user handler
async function registerUserController(req: Request, res: Response) {
  const { email } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400).send({ error: 'O usuário já existe' });
      return;
    }

    const user = await User.create(req.body);
    const token = generateToken({ id: user.id });

    return res.send({ user: omit(user.toJSON(), 'password'), token });
  } catch (error: any) {
    console.error(error);

    return res.status(400).send({ error: 'Ocorreu um erro.' });
  }
}

// login user handler
async function loginUserController(req: Request, res: Response) {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      res.status(404).send({ error: 'Usuário não encontrado' });
      return;
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      res.status(400).send({ error: 'Senha inválida' });
      return;
    }

    const token = generateToken({ id: user.id });

    return res.send({ user: omit(user.toJSON(), 'password'), token });
  } catch (error: any) {
    console.error(error);

    return res.status(400).send({ error: 'Ocorreu um erro.' });
  }
}

async function forgotPasswordController(req: Request, res: Response) {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      res.status(404).send({ error: 'Usuário não encontrado' });
      return;
    }

    const token = crypto.randomBytes(20).toString('hex');

    const now = new Date();
    now.setHours(now.getHours() + 1);

    await User.findByIdAndUpdate(user.id, {
      $set: {
        passwordResetToken: token,
        passwordResetExpires: now,
      },
    });

    transport.sendMail({
      to: email,
      from: 'gabriel.sampaio@econverse.com.br',
      subject: 'Esqueceu sua senha? - Canvance',
      html: `<p>Esqueceu sua senha? Sem problemas! Use esse token: ${token}</p>`,
    });

    return res.status(200).send();
  } catch (error: any) {
    console.error(error);

    res.status(400).send({ error: 'Ocorreu um erro - Esqueceu a senha' });
  }
}

async function resetPasswordController(req: Request, res: Response) {
  const { email, token, password } = req.body;

  try {
    const user = await User.findOne({ email }).select(
      '+passwordResetToken passwordResetExpires'
    );

    if (!user) {
      res.status(404).send({ error: 'Usuário não encontrado' });
      return;
    }

    const isTokenEqual = token === user.passwordResetToken;

    // console.log({ token, user: user.passwordResetToken });

    if (!isTokenEqual) {
      res.status(400).send({ error: 'Token inválido' });
      return;
    }

    const now = new Date();

    if (now > user.passwordResetExpires) {
      res.status(400).send({ error: 'O token está expirado.' });
      return;
    }

    user.password = password;

    await user.save();

    return res.status(200).send();
  } catch (error: any) {
    console.error(error);

    res.status(400).send({ error: 'Ocorreu um erro - Redefinir a senha' });
  }
}

const exportData = {
  login: loginUserController,
  register: registerUserController,
  forgotPassword: forgotPasswordController,
  resetPassword: resetPasswordController,
};

export default exportData;
