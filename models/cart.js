import path from "path";
import dirRoot from "../utils/path.js";
import fs from "fs";

const p = path.join(dirRoot, '..', 'data', 'cart.json');

class Cart {
    static addProduct(id, productPrice) {
            fs.readFile(p, (err, data) => {
                let cart = {products: [], totalPrice: 0};

                if (!err) {
                    cart = JSON.parse(data)
                }

                //Znajdź istniejący produkt w koszyku
                const existingProductIndex = cart.products.findIndex(product => product.id === id);
                const existingProduct = cart.products[existingProductIndex];
                let updatedProduct;

                //Dodaj nowy produkt do koszyka lub zwiększ ilość
                if (existingProduct) {
                    updatedProduct = {...existingProduct}
                    updatedProduct.quantity = updatedProduct.quantity + 1;

                    cart.products = [...cart.products];
                    cart.products[existingProductIndex] = updatedProduct;
                } else {
                    updatedProduct = {id: id, quantity: 1};
                    cart.products = [...cart.products, updatedProduct];
                }

                cart.totalPrice = cart.totalPrice + +productPrice
                fs.writeFile(p, JSON.stringify(cart), (err) => {
                    console.log(err);
                })
            })
    }

    static removeProduct(id, productPrice) {
        fs.readFile(p, (err, data) => {
            if (err) {
                return;
            }

            const updatedCart = {...JSON.parse(data)};
            const product = updatedCart.products.find(product => product.id === id);

            if (!product) {
                return;
            }

            updatedCart.products = updatedCart.products.filter(product => product.id !== id);
            updatedCart.totalPrice = updatedCart.totalPrice - productPrice * product.quantity;

            fs.writeFile(p, JSON.stringify(updatedCart), (err) => {
                console.log(err);
            })
        })
    }

    static getCart(callback) {
        fs.readFile(p, (err, data) => {
            const cart = JSON.parse(data);

            if (err) {
                callback(null)
            } else {
                callback(cart);
            }
        })
    }
}

export default Cart;