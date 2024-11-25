import { Router } from 'express';
import { validateCreateProduct } from '../middlewares/validation';
import {
  getAllProducts,
  createProduct,
} from '../controllers/products';

const router = Router();

router.get('/product', getAllProducts);
router.post('/product', validateCreateProduct, createProduct);

export default router;
