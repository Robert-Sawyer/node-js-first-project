import express from 'express';
import {
    getCart,
    getCheckout,
    getIndex,
    getOrders,
    getProducts,
    postCart,
    postCartDeleteProduct,
    getProductDetails
} from "../controllers/shop.js";

const router = express.Router();

router.get('/',getIndex);

router.get('/cart', getCart);

router.post('/cart', postCart);

router.post('/cart-delete-item', postCartDeleteProduct)

router.get('/orders',getOrders);

router.get('/checkout', getCheckout);

router.get('/products', getProducts);

router.get('/products/:productId', getProductDetails)

export default router;