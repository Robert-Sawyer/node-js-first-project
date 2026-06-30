import Product from "../models/product.js";

export function getAddProduct(req, res) {
    res.render('admin/add-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product'});
}

export function postAddProduct(req, res) {
    const title = req.body.title;
    const price = req.body.price;
    const description = req.body.description;
    const image = req.body.imageUrl;
    const product = new Product(title, image, description, price);

    product.save();
    res.redirect('/')
}

export function postEditProduct(req, res) {

}

export function getAdminProducts(req, res) {
    Product.fetchAll(products => {
        res.render('admin/products', {
            prods: products,
            pageTitle: 'Admin Products',
            path: 'admin/products',
            hasProducts: products.length > 0,
        });
    });
}
