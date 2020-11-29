import express from 'express';
import { createProduct, getProducts, getSingleProduct } from '../controllers/productController';
import { protect, authorize } from '../middleware/auth';
import { multerUploads } from "../../config/multer";

export const router: express.Router = express.Router();

router.route('/')
    .post(protect, multerUploads, createProduct)
    .get(getProducts);

router.route('/:slug')
    .get(getSingleProduct);
