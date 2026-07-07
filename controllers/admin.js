import mongodb from "mongodb";
import Product from "../models/product.js";

const ObjectId = mongodb.ObjectId;

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
    const imageUrl = req.body.imageUrl;

    const product = new Product(title, price, description, imageUrl)

    // SEQUELIZE (zamiast product.save())
    // req.user.createProduct({
    //     title,
    //     price,
    //     imageUrl,
    //     description,
    // })
        product
            .save()
            .then((result) => {
                console.log(result);
                res.redirect('/admin/products');
            })
            .catch((err) => {
              console.log(err);
             })
}

export function getEditProduct (req, res) {
    const editMode = req.query.edit;
    if (!editMode) {
        return res.redirect('/');
    }

    const prodId = req.params.productId;

    Product.findById(prodId)
        .then((product) => {
            if (!product) {
                return res.redirect('/');
            }

            res.render('admin/edit-product', {
                pageTitle: 'Edit Product',
                path: '/admin/edit-product',
                editing: editMode,
                product: product
            });
        })
        .catch(err => console.log(err));
}

export function postEditProduct(req, res) {
    const prodId = req.body.productId; // dlatego, że input name z edit-product.ejs ma wartość "productId"

    const updatedTitle = req.body.title; // jak powyżej i poniżej
    const updatedPrice = req.body.price;
    const updatedDescription = req.body.description;
    const updatedImage = req.body.imageUrl;

    const product = new Product(updatedTitle, updatedPrice, updatedDescription, updatedImage, new ObjectId(prodId));

    product.save()
    .then(() => {
        res.redirect('/admin/products');
    }).catch(err => console.log(err));

    // SEQUELIZE

    // Product.findByPk(prodId).then((product) => {
    //     product.title = updatedTitle;
    //     product.price = updatedPrice;
    //     product.description = updatedDescription;
    //     product.imageUrl = updatedImage;
    //
    //     product.save()
    // }).then(() => {
    //     res.redirect('/admin/products');
    // }).catch(err => console.log(err));
}

export function deleteProduct(req, res) {
    const prodId = req.body.productId;

    Product.deleteById(prodId)
        .then(() => {
            res.redirect('/admin/products');
        })
        .catch(err => console.log(err));
}

export function getAdminProducts(req, res) {
    Product.fetchAll()
        .then(products => {
            res.render('admin/products', {
                prods: products,
                pageTitle: 'Admin Products',
                path: 'admin/products',
                hasProducts: products.length > 0,
            });
        })
        .catch(err => console.log(err));
}
