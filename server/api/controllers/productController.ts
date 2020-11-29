import {Request, Response, NextFunction} from 'express';
import {Product} from "../../models/Product";
import {uploader} from "../../config/cloudinary";
import {dataUri} from "../../config/multer";
import { ErrorResponse } from '../utils/errorResponse';

const createProduct = async(req: Request,res: Response,next: NextFunction)=> {
    // @ts-ignore
    req.body.owner = req.user.id;

    // Cloudinary Comes in here
    // console.log(req.file);
    // console.log(req.body);

    const productObj = {
        owner: req.body.owner,
        name: req.body.name,
        description: req.body.description,
        size: req.body.size,
        price: req.body.price,
        availableStock: req.body.availableStock,
        category: req.body.category,
        image: undefined
    }
    if (req.file) {
        const file = dataUri(req).content;
        return uploader.upload(file).then(async (result: any) => {
            productObj.image = result.url;
            console.log(productObj);
            const product = await Product.create(productObj);
            return res.status(200).json({
                success: true,
                message: 'Your image has been uploaded to cloudinary',
                data: {
                    product
                }
            })
        }).catch((err: any) => res.status(400).json({
            message: 'Something went wrong while processing your request',
            data: { err }
        }));
    }
}

const getProducts = async(req: Request,res: Response,next: NextFunction)=> {
    Product.find({})
        .then(products => res.json({
            success: true,
            data: {products}
        }))
        .catch(err => res.json({
            success: false,
            message: {err}
        }))
}

const getSingleProduct = async(req: Request,res: Response,next: NextFunction)=> {
    const product = await Product.findOne({slug: req.params.slug})
    if (!product) {
        return next( new ErrorResponse('Product not found', 404))
    }
    res.status(200).json({
        success: true,
        data:product
    })
}


export { createProduct, getProducts, getSingleProduct };
