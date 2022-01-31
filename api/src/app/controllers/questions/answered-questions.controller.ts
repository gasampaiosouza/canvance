import { handleMissingFields } from '@/utils/handle-missing-fields';
import { Request, Response } from 'express';
import AnsweredQuestion from 'models/answered-questions.model';

import mongoose from 'mongoose';

async function getAllASWQuestions(req: Request, res: Response) {
  try {
    const questions = await AnsweredQuestion.find().sort({ order: 1 });

    return res.status(200).send(questions);
  } catch (error) {
    console.log(error);

    return res.status(400).send({ error: 'Não foi possível listar as perguntas' });
  }
}

async function getASWQuestionById(req: Request<{ questionId: string }>, res: Response) {
  if (!mongoose.isValidObjectId(req.params.questionId || '')) {
    res.status(400).send({ error: 'O ID da pergunta não é válido' });
    return;
  }

  try {
    const question = await AnsweredQuestion.findById(req.params.questionId);

    return res.status(201).send(question);
  } catch (error) {
    console.log(error);

    return res.status(400).send({ error: 'Não foi possível encontrar a pergunta' });
  }
}

async function getASWQuestionByUserId(req: Request<{ userId: string }>, res: Response) {
  if (!mongoose.isValidObjectId(req.params.userId || '')) {
    res.status(400).send({ error: 'O ID do usuário não é válido' });
    return;
  }

  try {
    const question = await AnsweredQuestion.find({ user: req.params.userId });

    return res.status(201).send(question);
  } catch (error) {
    console.log(error);

    return res.status(400).send({ error: 'Não foi possível encontrar as respostas' });
  }
}

async function createASWQuestion(req: Request, res: Response) {
  const { isMissingFields, fieldsMissing } = handleMissingFields(['user', 'questions'], req.body);

  if (isMissingFields) {
    res.status(422).send({ error: 'fields.missing', fields: fieldsMissing });
    return;
  }

  try {
    const question = await AnsweredQuestion.create(req.body);

    return res.status(201).send(question);
  } catch (error) {
    console.log(error);

    return res.status(400).send({ error: 'Não foi possível criar a pergunta' });
  }
}

async function updateASWQuestionById(req: Request<{ questionId: string }>, res: Response) {
  if (!mongoose.isValidObjectId(req.params.questionId || '')) {
    res.status(400).send({ error: 'O ID da pergunta não é válido' });
    return;
  }

  try {
    const question = await AnsweredQuestion.findByIdAndUpdate(req.params.questionId, req.body, {
      new: true,
    });

    return res.status(202).send(question);
  } catch (error) {
    console.log(error);

    return res.status(400).send({ error: 'Não foi possível atualizar a pergunta' });
  }
}

async function deleteASWQuestion(req: Request, res: Response) {
  if (!mongoose.isValidObjectId(req.params.questionId || '')) {
    res.status(400).send({ error: 'O ID da pergunta não é válido' });
    return;
  }

  try {
    await AnsweredQuestion.findByIdAndDelete(req.params.questionId);

    return res.status(202).send();
  } catch (error) {
    console.log(error);

    return res.status(400).send({ error: 'Não foi possível apagar a pergunta' });
  }
}

const exportData = {
  find: getAllASWQuestions,
  getById: getASWQuestionById,
  getByUserId: getASWQuestionByUserId,
  create: createASWQuestion,
  updateById: updateASWQuestionById,
  deleteById: deleteASWQuestion,
};

export default exportData;
