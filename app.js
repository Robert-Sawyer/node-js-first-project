import express from 'express';
import bodyParser from 'body-parser';
import {router as adminRoutes} from './routes/admin.js';
import userRoutes from './routes/shop.js';
import path from "path";
import dirRoot from './utils/path.js'

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(dirRoot, '..', 'public')));

app.use('/admin', adminRoutes);
app.use(userRoutes);

app.use('/', (req, res, next) => {
    res.status(404).render('not-found', {pageTitle: 'Page not found'});
})

app.listen(3000);
