import express from 'express';
import bodyParser from 'body-parser';
import {router as adminRoutes} from './routes/admin.js';
import shopRoutes from './routes/shop.js';
import path from "path";
import dirRoot from './utils/path.js'
import {get404} from "./controllers/error.js";
import {sequelize} from "./utils/database.js";

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(dirRoot, '..', 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(get404);

sequelize.sync().then((result) => {
    console.log(result);
    app.listen(3000);
}).catch((err) => {
    console.log(err);
})

