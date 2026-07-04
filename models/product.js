import {Sequelize} from "sequelize";

import {sequelize} from '../utils/database.js'

const Product = sequelize.define('product', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    price: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    imageUrl: {
      type: Sequelize.STRING,
      allowNull: false
    },
    description: {
        type: Sequelize.STRING
    }
})

export default Product;