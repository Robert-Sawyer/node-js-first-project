import {getDb} from "../utils/database.js";

class Product {
    constructor(title, price, description, imageUrl) {
        this.title = title;
        this.price = price;
        this.description = description;
        this.imageUrl = imageUrl;
    }

    save() {
        const db = getDb();

        return db.collection("products")
            .insertOne(this)
            .then((result) => {
                console.log(result)
            })
            .catch((err) => {
                console.error(err);
            })
    }

    static fetchAll() {
        const db = getDb();

        return db.collection("products")
            .find()
            .toArray()
            .then((products) => {
                console.log(products);
                return products;
            })
            .catch((err) => {
                console.error(err);
            });
    }
}



// TWORZENIE MODELU ZA POMOCA SEQUELIZE

// import Sequelize from "sequelize";
// import {sequelize} from '../utils/database.js'
//
// const Product = sequelize.define('product', {
//     id: {
//         type: Sequelize.INTEGER,
//         primaryKey: true,
//         autoIncrement: true,
//         allowNull: false,
//     },
//     title: {
//         type: Sequelize.STRING,
//         allowNull: false
//     },
//     price: {
//         type: Sequelize.DOUBLE,
//         allowNull: false
//     },
//     imageUrl: {
//       type: Sequelize.STRING,
//       allowNull: false
//     },
//     description: {
//         type: Sequelize.STRING
//     }
// })

export default Product;