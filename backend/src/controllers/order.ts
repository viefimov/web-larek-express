/* eslint-disable consistent-return */
import { Request, Response, NextFunction } from 'express';
import { faker } from '@faker-js/faker';
import Product from '../models/product';
import { BadRequestError, InternalServerError } from '../errors';

const createOrder = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const {
    payment, email, phone, address, total, items,
  } = req.body;

  if (!payment || !email || !phone || !address || !total || !items) {
    return next(new BadRequestError('Все поля обязательны'));
  }

  if (!['card', 'online'].includes(payment)) {
    return next(new BadRequestError('Недопустимый тип оплаты'));
  }

  if (!Array.isArray(items) || items.length === 0) {
    return next(
      new BadRequestError('Поле items должно быть непустым массивом'),
    );
  }

  Product.find({ _id: { $in: items } })
    .then((products) => {
      if (products.length !== items.length) {
        throw new BadRequestError('Некоторые товары не найдены');
      }

      const invalidProducts = products.filter(
        (product) => product.price == null,
      );
      if (invalidProducts.length > 0) {
        throw new BadRequestError('Некоторые товары недоступны для продажи');
      }

      const calculatedTotal = products.reduce(
        (sum, product) => sum + (product.price || 0),
        0,
      );
      if (calculatedTotal !== total) {
        throw new BadRequestError(
          'Сумма total не совпадает с расчетной стоимостью товаров',
        );
      }

      const orderId = faker.string.uuid();

      return res.status(200).send({
        id: orderId,
        total: calculatedTotal,
      });
    })
    .catch((error) => next(error instanceof Error ? error : new InternalServerError()));
};
export default createOrder;
