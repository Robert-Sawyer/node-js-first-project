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
    const imageUrl = req.body.imageUrl;

    req.user.createProduct({
        title,
        price,
        imageUrl,
        description,
    }).then((result) => {
        console.log(result);
        res.redirect('/admin/products');
    }).catch((err) => {
        console.log(err);
    })
}

export function getEditProduct (req, res) {
    const editMode = req.query.edit;
    if (!editMode) {
        return res.redirect('/');
    }

    const prodId = req.params.productId;

    req.user.getProducts({where: {id: prodId}})
        // Product.findByPk(prodId) // można też tak pobrać produkty, ale poprzez usera upewniamy się, że user faktycznie jest powązany z produktem
        .then((products) => {
            const product = products[0];

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

    Product.findByPk(prodId).then((product) => {
        product.title = updatedTitle;
        product.price = updatedPrice;
        product.description = updatedDescription;
        product.imageUrl = updatedImage;
        product.save()
    }).then(result => {
        console.log("UPDATED PRODUCT");
        res.redirect('/admin/products');
    }).catch(err => console.log(err));
}

export function deleteProduct(req, res) {
    const prodId = req.body.productId;

    Product.findByPk(prodId)
        .then((product) => {
            return product.destroy();
        })
        .then(result => {
            console.log('DELETED PRODUCT');
            res.redirect('/admin/products');
        })
        .catch(err => console.log(err));
}

export function getAdminProducts(req, res) {
    req.user.getProducts()
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
