import { Request, Response } from 'express';
import { omit } from 'lodash';
import User from '../models/user.model';

import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import authConfig from '@config/auth.json';
import transport from '@/modules/mailer';
import { handleMissingFields } from '@/utils/handle-missing-fields';

function generateToken(params: string | object | Buffer) {
  const token = jwt.sign(params, authConfig.secret, {
    expiresIn: 86400, // 1 day
  });

  return token;
}

// register user handler
async function registerUser(req: Request, res: Response) {
  const { isMissingFields, fieldsMissing } = handleMissingFields(
    ['name', 'email', 'password', 'category', 'permissionLevel'],
    req.body
  );

  if (isMissingFields) {
    res.status(422).send({ error_message: 'fields.missing', fields: fieldsMissing });
    return;
  }

  try {
    const userExists = await User.findOne({ email: req.body.email });

    if (userExists) {
      res.status(400).send({ error_message: 'O usuário já existe' });
      return;
    }

    const user = await (await User.create(req.body)).populate('category');
    const token = generateToken({ id: user.id, permissionLevel: user.permissionLevel });

    return res.send({ user: omit(user.toJSON(), 'password'), token });
  } catch (error: any) {
    console.log(error);

    return res.status(400).send({ error_message: 'Ocorreu um erro inesperado.' });
  }
}

// login user handler
async function loginUser(req: Request, res: Response) {
  const { isMissingFields, fieldsMissing } = handleMissingFields(
    ['email', 'password'],
    req.body
  );

  if (isMissingFields) {
    res.status(422).send({ error_message: 'fields.missing', fields: fieldsMissing });
    return;
  }

  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password').populate('category');

    if (!user) {
      res.status(404).send({ error_message: 'Usuário não encontrado', type: 'email' });
      return;
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      res.status(400).send({ error_message: 'Senha inválida', type: 'password' });
      return;
    }

    const token = generateToken({ id: user.id, permissionLevel: user.permissionLevel });

    return res.send({ user: omit(user.toJSON(), 'password'), token });
  } catch (error: any) {
    console.log(error);

    return res.status(400).send({ error_message: 'Ocorreu um erro inesperado.' });
  }
}

async function forgotPassword(req: Request, res: Response) {
  const { isMissingFields, fieldsMissing } = handleMissingFields(['email'], req.body);

  if (isMissingFields) {
    res.status(422).send({ error_message: 'fields.missing', fields: fieldsMissing });
    return;
  }

  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      res.status(404).send({ success: false, message: 'Usuário não encontrado' });
      return;
    }

    const token = crypto.randomBytes(20).toString('hex');

    const now = new Date();
    now.setHours(now.getHours() + 1);

    await User.findByIdAndUpdate(user.id, {
      $set: { passwordResetToken: token, passwordResetExpires: now },
    });

    transport.sendMail(
      {
        from: 'Canvance 👻 <canvance@econverse.com.br>',
        to: req.body.email,
        subject: 'Canvance - Esqueceu sua senha?',
        // text: `Acesse esse link para alterar a sua senha`,
        html: `Clique <a href="http://localhost:3000/account/change-password/${token}">aqui</a> para alterar a sua senha`,
      },
      (err, info) => {
        if (err) {
          console.log(err);
          return res
            .status(400)
            .send({ success: false, message: 'Ocorreu um erro inesperado.' });
        }

        return res
          .status(200)
          .send({ success: true, message: 'Email enviado com sucesso!' });
      }
    );
  } catch (error: any) {
    console.log(error);

    res.status(400).send({ error_message: 'Ocorreu um erro - Esqueceu a senha' });
  }
}

async function resetPassword(req: Request, res: Response) {
  const { isMissingFields, fieldsMissing } = handleMissingFields(
    ['email', 'token', 'password'],
    req.body
  );

  if (isMissingFields) {
    res.status(422).send({ error_message: 'fields.missing', fields: fieldsMissing });
    return;
  }

  try {
    const { email, token, password } = req.body;

    const user = await User.findOne({ email }).select(
      '+passwordResetToken passwordResetExpires'
    );

    if (!user) {
      res.status(404).send({ error_message: 'Usuário não encontrado' });
      return;
    }

    const isTokenEqual = token === user.passwordResetToken;

    if (!isTokenEqual) {
      res.status(400).send({ error_message: 'token.invalid' });
      return;
    }

    const now = new Date();

    if (now > user.passwordResetExpires) {
      res.status(400).send({ error_message: 'token.expired' });
      return;
    }

    user.password = password;

    await user.save();

    return res.status(200).send();
  } catch (error: any) {
    console.log(error);

    res.status(400).send({ error_message: 'Ocorreu um erro - Redefinir a senha' });
  }
}

const exportData = {
  login: loginUser,
  register: registerUser,
  forgotPassword: forgotPassword,
  resetPassword: resetPassword,
};

export default exportData;
