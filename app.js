import express from 'express';
import bodyParser from 'body-parser';
import {router as adminRoutes} from './routes/admin.js';
import shopRoutes from './routes/shop.js';
import path from "path";
import dirRoot from './utils/path.js'
import {get404} from "./controllers/error.js";
import mongoConnect from "./utils/database.js";

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(dirRoot, '..', 'public')));

app.use((req,res,next) => {
    // User.findByPk(1)
    //     .then((user) => {
    //         req.user = user;
    //         next()
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //     })
    next()
})

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(get404);

mongoConnect(client => {
    console.log(client);
    app.listen(3000);
})



// MYSQL & SEQUELIZE

// Stworzenie relacji między Produktem, Userem, Koszykiem i Zamówieniem

// Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
// User.hasMany(Product);
// User.hasOne(Cart);
// Cart.belongsTo(User);
// Cart.belongsToMany(Product, { through: CartItem });
// Product.belongsToMany(Cart, { through: CartItem });
// Order.belongsTo(User);
// User.hasMany(Order);
// Order.belongsToMany(Product, { through: OrderItem });

// sequelize
     //.sync({force: true}) // dodaje to bo tabela z Produktami juz istnieje i trzeba stworzyć relacje z Userem
//      .sync()
//     .then(() => {
//         return User.findByPk(1);
//     })
//     .then(user => {
//         if (!user) {
//             return User.create({
//                 name: 'Rob',
//                 email: 'sawyer@bob.pl'
//             })
//         }
//
//         return user
//     })
//     .then(user => {
//         return user.createCart()
//     })
//     .then(cart => {
//         app.listen(3000);
//
//     })
//     .catch((err) => {
//     console.log(err);
// })

