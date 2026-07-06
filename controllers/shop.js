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

export function postOrder(req, res) {
    let fetchedCart;

    req.user
        .getCart()
        .then(cart => {
            fetchedCart = cart;

            return cart.getProducts()
        })
        .then(products => {
            return req.user
                .createOrder()
                .then(order => {
                return order.addProducts(products.map(product => {
                    product.orderItem = {quantity: product.cartItem.quantity}; // należy użyć takiej samej nazwy (orderItem), co w define() wewnątrz model orderItem
                    return product
                }))
            }).catch(err => console.log(err));
        })
        .then(() => {
            return fetchedCart.setProducts(null);
        })
        .then(() => {
            res.redirect('/orders');

        })
        .catch(err => console.log(err));
}

export function getOrders(req, res) {
    req.user.getOrders({include: ['products']}) //trzeba to dodać, żeby sequelize pobrało zamówienia z powiązanym produktem (sequelize robi z tego liczbę mnogą). Wtedy w orders.ejs trzeba robić loop po products, nie po orderItem. Wtedy to products dostaje klucz orderItem i quantity wyciąga się z stamtąd.
        .then(orders => {
            res.render('shop/orders', {
                pageTitle: 'Orders',
                path: '/orders',
                orders
            })
        }).catch(err => console.log(err));

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
