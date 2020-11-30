"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSingleProduct = exports.getProducts = exports.createProduct = void 0;
const Product_1 = require("../../models/Product");
const cloudinary_1 = require("../../config/cloudinary");
const multer_1 = require("../../config/multer");
const errorResponse_1 = require("../utils/errorResponse");
const createProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
    };
    if (req.file) {
        const file = multer_1.dataUri(req).content;
        return cloudinary_1.uploader.upload(file).then((result) => __awaiter(void 0, void 0, void 0, function* () {
            productObj.image = result.url;
            console.log(productObj);
            const product = yield Product_1.Product.create(productObj);
            return res.status(200).json({
                success: true,
                message: 'Your image has been uploaded to cloudinary',
                data: {
                    product
                }
            });
        })).catch((err) => res.status(400).json({
            message: 'Something went wrong while processing your request',
            data: { err }
        }));
    }
});
exports.createProduct = createProduct;
const getProducts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    Product_1.Product.find({})
        .then(products => res.json({
        success: true,
        data: { products }
    }))
        .catch(err => res.json({
        success: false,
        message: { err }
    }));
});
exports.getProducts = getProducts;
const getSingleProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield Product_1.Product.findOne({ slug: req.params.slug });
    if (!product) {
        return next(new errorResponse_1.ErrorResponse('Product not found', 404));
    }
    res.status(200).json({
        success: true,
        data: product
    });
});
exports.getSingleProduct = getSingleProduct;
//# sourceMappingURL=productController.js.map