import express from 'express';
import {
    deleteProduct,
    getAddProduct,
    getAdminProducts,
    getEditProduct,
    postAddProduct,
    postEditProduct
} from '../controllers/admin.js';

const router = express.Router();

// /admin/add-product => GET
router.get('/add-product', getAddProduct)

// /admin/products => GET
router.get('/products', getAdminProducts);

// /admin/add-product => POST
router.post('/add-product', postAddProduct)

router.get('/edit-product/:productId', getEditProduct)

router.post('/edit-product', postEditProduct);

router.post('/delete-product', deleteProduct);

export {router};