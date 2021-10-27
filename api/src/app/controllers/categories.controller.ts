import { handleMissingFields } from '@/utils/handle-missing-fields';
import { Request, Response } from 'express';
import mongoose from 'mongoose';

import Category from '../models/category.model';

// req.userId

interface RequestType {
  name: string;
  description: string;
  priority: string;
}

async function getAllCategoriesController(req: Request, res: Response) {
  try {
    const categories = await Category.find();

    return res.status(200).send(categories);
  } catch (error) {
    console.log(error);

    return res
      .status(400)
      .send({ error: 'Não foi possível listar as categorias' });
  }
}

async function createCategoriesController(
  req: Request<{}, {}, RequestType>,
  res: Response
) {
  const { isMissingFields, fieldsMissing } = handleMissingFields(
    ['name', 'description', 'priority'],
    req.body
  );

  if (isMissingFields) {
    res.status(422).send({ error: 'fields.missing', fields: fieldsMissing });
    return;
  }

  try {
    const category = await Category.create(req.body);

    return res.status(201).send(category);
  } catch (error) {
    console.log(error);

    return res
      .status(400)
      .send({ error: 'Não foi possível criar uma categoria' });
  }
}

async function getCategoryByIdController(req: Request, res: Response) {
  if (!mongoose.isValidObjectId(req.params.categoryId || '')) {
    res.status(400).send({ error: 'O ID da categoria não é válido' });
    return;
  }

  try {
    const categories = await Category.findById(req.params.categoryId);

    return res.status(200).send(categories);
  } catch (error) {
    console.log(error);

    return res
      .status(400)
      .send({ error: 'Não foi possível listar a categoria' });
  }
}

async function updateCategoryByIdController(
  req: Request<{ categoryId: string }, {}, RequestType>,
  res: Response
) {
  if (!mongoose.isValidObjectId(req.params.categoryId || '')) {
    res.status(400).send({ error: 'O ID da categoria não é válido' });
    return;
  }

  const { isMissingFields, fieldsMissing } = handleMissingFields(
    ['name', 'description', 'priority'],
    req.body
  );

  if (isMissingFields) {
    res.status(422).send({ error: 'fields.missing', fields: fieldsMissing });
    return;
  }

  try {
    const category = await Category.findByIdAndUpdate(
      req.params.categoryId,
      req.body,
      { new: true }
    );

    return res.status(202).send(category);
  } catch (error) {
    console.log(error);

    return res
      .status(400)
      .send({ error: 'Não foi possível atualizar a categoria' });
  }
}

async function deleteCategoryByIdController(req: Request, res: Response) {
  if (!mongoose.isValidObjectId(req.params.categoryId || '')) {
    res.status(400).send({ error: 'O ID da categoria não é válido' });
    return;
  }

  try {
    await Category.findByIdAndRemove(req.params.categoryId);

    return res.status(202).send();
  } catch (error) {
    console.log(error);

    return res
      .status(400)
      .send({ error: 'Não foi possível remover a categoria' });
  }
}

const exportData = {
  find: getAllCategoriesController,
  create: createCategoriesController,
  getById: getCategoryByIdController,
  updateById: updateCategoryByIdController,
  deleteById: deleteCategoryByIdController,
};

export default exportData;
