import express from 'express';
import {getAddProduct, getAdminProducts, postAddProduct, postEditProduct} from '../controllers/admin.js';

const router = express.Router();

router.get('/add-product', getAddProduct)

router.post('/add-product', postAddProduct)

router.post('/edit-product', postEditProduct);

router.get('/products', getAdminProducts);

export {router};