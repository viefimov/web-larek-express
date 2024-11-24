import express from 'express';
import createOrder from '../controllers/order';
import { validateCreateOrder } from '../middlewares/validation';

const router = express.Router();

// Маршрут для создания заказа
router.post('/order', validateCreateOrder, createOrder);

export default router;
