import { handleMissingFields } from '@/utils/handle-missing-fields';
import { Request, Response } from 'express';
import Question from 'models/question.model';

import mongoose from 'mongoose';

async function getAllQuestions(req: Request, res: Response) {
  try {
    const questions = await Question.find().sort({ order: 1 }).populate('category');

    return res.status(200).send(questions);
  } catch (error) {
    console.log(error);

    return res.status(400).send({ error: 'Não foi possível listar as perguntas' });
  }
}

async function getQuestionById(req: Request<{ questionId: string }>, res: Response) {
  if (!mongoose.isValidObjectId(req.params.questionId || '')) {
    res.status(400).send({ error: 'O ID da pergunta não é válido' });
    return;
  }

  try {
    const question = await Question.findById(req.params.questionId).populate('category');

    return res.status(201).send(question);
  } catch (error) {
    console.log(error);

    return res.status(400).send({ error: 'Não foi possível encontrar a pergunta' });
  }
}

async function createQuestion(req: Request, res: Response) {
  if (!req.body.type) {
    return res.status(400).send({ error: 'O tipo da pergunta é obrigatório' });
  }

  let answerIsRequired = req.body.type === 'multiple' ? true : false;

  const { isMissingFields, fieldsMissing } = handleMissingFields(
    ['category', 'label', answerIsRequired ? 'answers' : ''].filter(Boolean),
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

    if (!req.body.order) {
      const questions = await Question.find().sort({ order: 1 });

      req.body.order = questions[questions.length - 1].order + 1 || 1;
    }

    const question = await Question.create(req.body);

    return res.status(201).send(question);
  } catch (error) {
    console.log(error);

    return res.status(400).send({ error: 'Não foi possível criar a pergunta' });
  }
}

async function updateQuestionById(req: Request<{ questionId: string }>, res: Response) {
  if (!mongoose.isValidObjectId(req.params.questionId || '')) {
    res.status(400).send({ error: 'O ID da pergunta não é válido' });
    return;
  }

  try {
    if (typeof req.body.category == 'string') {
      req.body.category = req.body.category.split(',');
    }

    const question = await Question.findByIdAndUpdate(req.params.questionId, req.body, {
      new: true,
    });

    return res.status(202).send(question);
  } catch (error) {
    console.log(error);

    return res.status(400).send({ error: 'Não foi possível atualizar a pergunta' });
  }
}

async function deleteQuestion(req: Request, res: Response) {
  if (!mongoose.isValidObjectId(req.params.questionId || '')) {
    res.status(400).send({ error: 'O ID da pergunta não é válido' });
    return;
  }

  try {
    await Question.findByIdAndDelete(req.params.questionId);

    return res.status(202).send();
  } catch (error) {
    console.log(error);

    return res.status(400).send({ error: 'Não foi possível apagar a pergunta' });
  }
}

async function getQuestionByCategory(req: Request<{ categoryId: string }>, res: Response) {
  const categoryId = req.params.categoryId;
  const parsedId = categoryId.includes(',') ? categoryId.split(',') : [categoryId];

  // if (!mongoose.isValidObjectId(req.params.categoryId || '')) {
  //   res.status(400).send({ error: 'O ID da categoria não é válido' });
  //   return;
  // }

  if (parsedId.some((id) => !mongoose.isValidObjectId(id))) {
    res.status(400).send({ error: 'O ID da categoria não é válido' });
    return;
  }

  try {
    const question = await Question.find({ category: { $in: parsedId } }).sort({ order: 1 });

    return res.status(201).send(question);
  } catch (error) {
    console.log(error);

    return res.status(400).send({ error: 'Não foi possível encontrar a perguntas' });
  }
}

const exportData = {
  find: getAllQuestions,
  getById: getQuestionById,
  getByCategory: getQuestionByCategory,
  create: createQuestion,
  updateById: updateQuestionById,
  deleteById: deleteQuestion,
};

export default exportData;
