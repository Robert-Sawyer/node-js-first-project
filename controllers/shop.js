import Product from "../models/product.js";

export function getProducts(req, res) {
    Product.fetchAll(products => {
        res.render('shop/products-list', {
            prods: products,
            pageTitle: 'All Products',
            path: '/products',
            hasProducts: products.length > 0,
        });
    });
}

export function getCart(req, res) {
    res.render('shop/cart', {
        pageTitle: 'Cart',
        path: '/cart',
    })
}

export function getOrders(req, res) {
    res.render('shop/orders', {
        pageTitle: 'Orders',
        path: '/orders',
    })
}

export function getCheckout(req, res) {
    res.render('shop/checkout', {
        pageTitle: 'Checkout',
        path: '/checkout',
    })
}

export function getIndex(req, res) {
    Product.fetchAll(products => {
        res.render('shop/index', {
            prods: products,
            pageTitle: 'Shop',
            path: '/',
            hasProducts: products.length > 0,
        });
    });
}
