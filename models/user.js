import {Sequelize} from "sequelize";

import {sequelize} from '../utils/database.js'

const User = sequelize.define('User', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    name: Sequelize.STRING,
    email: Sequelize.STRING,
})

export default User;