import Product from "../models/product.js";
import CartItem from "../models/cartItem.js";

export function getProducts(req, res) {
    Product.findAll()
        .then(products => {
            res.render('shop/products-list', {
                prods: products,
                pageTitle: 'All Products',
                path: '/products',
                hasProducts: products.length > 0,
            });
        })
        .catch(err => console.log(err));
}

export function getCart(req, res) {
    CartItem.getCart(cart => {
        Product.fetchAll(products => {
            const cartProducts = [];
            for (const product of products) {
                const cartProductData = cart.products.find(
                    prod => prod.id === product.id
                );

                if (cartProductData) {
                    cartProducts.push({ productData: product, quantity: cartProductData.quantity });
                }
            }

            res.render('shop/cart', {
                path: '/cart',
                pageTitle: 'Your Cart',
                products: cartProducts
            });
        })
    })
}

export function postCart(req, res) {
    const prodId = req.body.productId;

    Product.findById(prodId, product => {
        CartItem.addProduct(prodId, product.price)
    })
    res.redirect('/cart');
}

export function postCartDeleteProduct(req, res) {
    const prodId = req.body.productId;

    Product.findById(prodId, product => {
        CartItem.removeProduct(prodId, product.price);

        res.redirect('/cart');
    })
}

export function getProductDetails(req, res) {
    const prodId = req.params.productId;

    Product
        .findByPk(prodId)
        .then((product) => {
            res.render('shop/product-detail', {
                pageTitle: product.title,
                path: `/${prodId}`,
                product: product,
            })
        })
        .catch(err => console.log(err));

    //Poniżej wersja alternatywna z wykorzystaniem findAll()

    // Product
    //     .findAll({where: {id: prodId}})
    //     .then((products) => {
    //         res.render('shop/product-detail', {
    //             pageTitle: products[0].title,
    //             path: `/${prodId}`,
    //             product: products[0],
    //         })
    //     })
    //     .catch(err => console.log(err));
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
    Product.findAll()
        .then(products => {
            res.render('shop/index', {
                prods: products,
                pageTitle: 'Shop',
                path: '/',
                hasProducts: products.length > 0,
            });
        })
        .catch(err => console.log(err));
}
