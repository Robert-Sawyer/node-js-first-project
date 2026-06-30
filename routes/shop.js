import express from 'express';
import {getCart, getCheckout, getIndex, getOrders, getProducts} from "../controllers/shop.js";

const router = express.Router();

router.get('/',getIndex);

router.get('/cart',getCart);

router.get('/orders',getOrders);

router.get('/checkout', getCheckout);

router.get('/products', getProducts);

export default router;