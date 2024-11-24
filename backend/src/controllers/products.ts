/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable consistent-return */
import { Request, Response, NextFunction } from 'express';
import Product from '../models/product';
import { BadRequestError, ConflictError, InternalServerError } from '../errors';

export const getAllProducts = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  Product.find({})
    .then((products) => res.send({
      items: products,
      total: products.length,
    }))
    .catch(() => next(new InternalServerError()));
};

export const createProduct = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const {
    title, image, category, description, price,
  } = req.body;

  const newProduct = new Product({
    title,
    image,
    category,
    description,
    price,
  });

  newProduct
    .save()
    .then((product) => res.status(201).send(product))
    .catch((error) => {
      if (error instanceof Error && error.message.includes('E11000')) {
        return next(
          new ConflictError('Товар с таким названием уже существует'),
        );
      }
      return next(new BadRequestError('Ошибка при создании товара'));
    });
};
