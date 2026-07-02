import Product from "../models/product.js";

export function getAddProduct(req, res) {
    res.render('admin/edit-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        editing: false
    });
}

export function postAddProduct(req, res) {
    const title = req.body.title;
    const price = req.body.price;
    const description = req.body.description;
    const image = req.body.imageUrl;
    const product = new Product(null, title, image, description, price);

    product
        .save()
        .then(() => res.redirect('/'))
        .catch(err => console.log(err));
}

export function getEditProduct (req, res) {
    const editMode = req.query.edit;
    if (!editMode) {
        return res.redirect('/');
    }
    const prodId = req.params.productId;
    Product.findById(prodId, product => {
        if (!product) {
            return res.redirect('/');
        }
        res.render('admin/edit-product', {
            pageTitle: 'Edit Product',
            path: '/admin/edit-product',
            editing: editMode,
            product: product
        });
    });
}

export function postEditProduct(req, res) {
    const prodId = req.body.productId; // dlatego, że input name z edit-product.ejs ma wartość "productId"

    const updatedTitle = req.body.title; // jak powyżej i poniżej
    const updatedPrice = req.body.price;
    const updatedDescription = req.body.description;
    const updatedImage = req.body.imageUrl;

    const updatedProduct = new Product(prodId, updatedTitle, updatedImage, updatedDescription, updatedPrice);
    updatedProduct.save();

    res.redirect('/admin/products');
}

export function deleteProduct(req, res) {
    const prodId = req.body.productId;

    Product.delete(prodId);
    res.redirect('/admin/products');
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
