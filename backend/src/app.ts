/* eslint-disable @typescript-eslint/no-unused-vars */
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { errors } from 'celebrate';
import path from 'path';
import { requestLogger, errorLogger } from './middlewares/logger';
import errorHandler from './middlewares/errorHandler';
import config from './config';
import productRoutes from './routes/product';
import orderRoutes from './routes/order';
import { NotFoundError } from './errors';

const app = express();
mongoose
  .connect(config.dbAddress as string)
  .then(() => console.log('База данных подключена'))
  .catch((err) => console.log('Ошибка подключения к БД:', err));
app.use(requestLogger);

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', productRoutes);
app.use('/', orderRoutes);
app.use((req, res, next) => {
  next(new NotFoundError('Маршрут не найден'));
});
app.use(errorLogger);
app.use(errors);
app.use(errorHandler);
app.listen(config.port, () => {
  console.log(config.port);
});
