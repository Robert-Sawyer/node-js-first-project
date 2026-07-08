import mongodb from "mongodb";
import {getDb} from "../utils/database.js";

class Product {
    constructor(title, price, description, imageUrl, id, userId) {
        this.title = title;
        this.price = price;
        this.description = description;
        this.imageUrl = imageUrl;
        this._id = id ? new mongodb.ObjectId(id) : null;
        this.userId = userId;
    }

    save() {
        const db = getDb();
        let dbOperator;

        if (this._id) {
            // Update the product
            dbOperator = db.collection('products')
                .updateOne({_id: this._id}, {$set: this});
        } else {
            dbOperator = db.collection('products').insertOne(this);
        }
        return dbOperator
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
                return products;
            })
            .catch((err) => {
                console.error(err);
            });
    }

    static findById(prodId) {
        const db = getDb();

        return db.collection("products")
            .find({_id: new mongodb.ObjectId(prodId)}) // mongo nie traktuje id elementu jako string, tylko jako obiekt i należy wykorzystać konstruktor ObjectId z mongodb
            .next() // mongo trzyma też id pod kluczem z podkreśleniem, czyli "_id"
            .then((product) => {
                return product;
            })
            .catch((err) => {
                console.error(err);
            })
    }

    static deleteById(id) {
        const db = getDb();

        return db.collection("products")
            .deleteOne({_id: new mongodb.ObjectId(id)})
            .then(() => {
                console.log("deleted");
            }).catch(err => console.log(err));
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