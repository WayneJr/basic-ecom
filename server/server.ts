import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';
import { router as indexRoutes } from './api/routes/indexRoutes';
import { router as productRoutes } from './api/routes/productRoutes';
import { cloudinaryConfig } from "./config/cloudinary";
const app:express.Application = express();
// @ts-ignore
const cors = require("cors");

// const indexRoutes = require('./api/routes/indexRoutes');


const port:any = process.env.PORT || 3000;
const dbUrl:any = process.env.DATABASE_URL;

// @ts-ignore
mongoose.connect(dbUrl, {useUnifiedTopology: true, useNewUrlParser: true})
    .then(() => console.log('connected'))
    .catch(error => console.log(error));

app.use(cors());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use('*', cloudinaryConfig);

app.use('/api/v1/auth', indexRoutes);
app.use('/api/v1/products', productRoutes);

app.listen(port, () => console.log(`listening on port: ${port}`));
