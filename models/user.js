import mongodb from "mongodb";
import {getDb} from "../utils/database.js";

const ObjectId = mongodb.ObjectId;

class User {
    constructor(username, email, cart, id) {
        this.username = username;
        this.email = email;
        this.cart = cart; // {items: []}
        this._id = id ? new ObjectId(id) : null;
    }

    save() {
        const db = getDb();

        return db
            .collection('users')
            .insertOne(this)
            .then(result => {
                console.log(result);
            })
            .catch(error => {
                console.error(error);
            })
    }

    addToCart(product) {
        const db = getDb();

        const cartProductIndex = this.cart.items?.findIndex(item => {
            return item.productId.toString() === product._id.toString();
        });

        const updatedCartItems = this.cart.items ? [...this.cart.items] : [];
        let newQuantity = 1;

        if (cartProductIndex >= 0) {
            newQuantity = this.cart.items[cartProductIndex].quantity + 1;
            updatedCartItems[cartProductIndex].quantity = newQuantity;
        } else {
            updatedCartItems.push({
                productId: new ObjectId(product._id),
                quantity: newQuantity
            })
        }

        const updatedCart = {
            items: updatedCartItems
        }

        return db.collection('users').updateOne(
            {_id: new ObjectId(this._id)},
            {$set: {cart: updatedCart}}
        )
    }

    getCart() {
        const db = getDb();

        const productsIds = this.cart.items?.map(item => {
            return item.productId;
        })

        return db.collection('products')
            .find({_id: {$in: productsIds}}) // znajdź w kolekcji 'products' elementy, których id zgadza się z tymi w tablicy productsIds
            .toArray()
            .then(products => {
                return products.map(p => {
                    return {
                        ...p,
                        quantity: this.cart.items.find(i => {
                            return i.productId.toString() === p._id.toString()
                        }).quantity
                    }
                })
            })
    }

    deleteItemFromCart(productId) {
        const updatedCartItems = this.cart.items.filter(item => {
            return item.productId.toString() !== productId.toString()
        });

        const db = getDb();

        return db.collection('users').updateOne(
            {_id: new ObjectId(this._id)},
            {$set: {cart: {items: updatedCartItems}}}
        )
    }

    static findById(id) {
        const db = getDb();

        return db
            .collection('users')
            .findOne({ _id: new ObjectId(id) })
            .then(user => {
                return user;
            })
            .catch(err => {
                console.log(err);
            })
    }
}

export default User;




// SEQUELIZE

// import Sequelize from "sequelize";
//
// import {sequelize} from '../utils/database.js'
//
// const User = sequelize.define('User', {
//     id: {
//         type: Sequelize.INTEGER,
//         primaryKey: true,
//         autoIncrement: true,
//         allowNull: false,
//     },
//     name: Sequelize.STRING,
//     email: Sequelize.STRING,
// })
//
// export default User;