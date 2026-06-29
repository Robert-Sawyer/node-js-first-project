import fs from 'fs';
import path from 'path';
import dirRoot from "../utils/path.js";

const p = path.join(dirRoot, '..', 'data', 'products.json');

const getProductsFromFile = (callback) => {
    fs.readFile(p, (err, fileContent) => {
        if (err) {
            callback([])
        } else {
            callback(JSON.parse(fileContent))
        }
    });
}

class Product {
    constructor(t) {
        this.title = t
    }

    save() {
        getProductsFromFile(products => {
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), (err) => {
                console.log(err);
            })
        })
    }

    static fetchAll(callback) {
        getProductsFromFile(callback);
    }
}

export default Product;