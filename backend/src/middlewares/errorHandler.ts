import { CelebrateError } from 'celebrate';
import { Error as MongooseError } from 'mongoose';
import { Request, Response, NextFunction } from 'express';

const errorHandler = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (err instanceof CelebrateError) {
    const errorDetails = Array.from(err.details.values())
      .map((detail) => detail.message)
      .join('; ');
    return res
      .status(400)
      .send({ message: `Ошибка валидации: ${errorDetails}` });
  }

  if (err instanceof MongooseError.ValidationError) {
    const messages = Object.values(err.errors).map((err) => err.message);
    return res
      .status(400)
      .send({ message: `Ошибка валидации: ${messages.join('; ')}` });
  }

  if (err.code === 11000) {
    return res.status(409).send({ message: 'Поле уже существует' });
  }
  if (err.statusCode === 404) {
    return res.status(404).send({
      message: err.message,
    });
  }

  const { statusCode = 500, message = 'Внутренняя ошибка сервера' } = err;
  return res.status(statusCode).send({ message });
};

export default errorHandler;
