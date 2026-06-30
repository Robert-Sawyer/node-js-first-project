import Product from "../models/product.js";
import Cart from "../models/cart.js";

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

export function postCart(req, res) {
    const prodId = req.body.productId;

    Product.findById(prodId, product => {
        Cart.addProduct(prodId, product.price)
    })
    res.redirect('/cart');
}

export function getProductDetails(req, res) {
    const prodId = req.params.productId;
    Product.findById(prodId, (product) => {
        res.render('shop/product-detail', {
            pageTitle: product.title,
            path: `/${prodId}`,
            product: product,
        });    })

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
