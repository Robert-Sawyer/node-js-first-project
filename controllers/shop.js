import Product from "../models/product.js";

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
    req.user
        .getCart()
        .then(cart => {
            return cart
                .getProducts()
                .then(products => {
                    res.render('shop/cart', {
                        path: '/cart',
                        pageTitle: 'Your Cart',
                        products: products
                    });
                })
        })
        .catch(err => console.log(err));
}

export function postCart(req, res) {
    const prodId = req.body.productId;
    let fetchedCart;
    let newQuantity = 1;

    req.user
        .getCart()
        .then(cart => {
            fetchedCart = cart;

            return cart.getProducts({where: {id: prodId}})
        })
        .then(products => {
            let product;

            if (products.length > 0) {
                product = products[0];
            }

            if (product) {
              const oldQuantity = product.cartItem.quantity;
              newQuantity = oldQuantity + 1;
              return product;
            }

            return Product.findByPk(prodId)
        })
        .then(product => {
            return fetchedCart.addProduct(product, {
                through: {
                    quantity: newQuantity
                }
            })
        })
        .then(() => {
            res.redirect('/cart');
        })
        .catch(err => console.log(err));
}

export function postCartDeleteProduct(req, res) {
    const prodId = req.body.productId;

    req.user.getCart()
        .then(cart => {
            return cart.getProducts({where: {id: prodId}})
        })
        .then(products => {
            const product = products[0];
            return product.cartItem.destroy();
        })
        .then(() => {
            res.redirect('/cart');
        })
        .catch(err => console.log(err));
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
