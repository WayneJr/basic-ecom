"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const productController_1 = require("../controllers/productController");
const auth_1 = require("../middleware/auth");
const multer_1 = require("../../config/multer");
exports.router = express_1.default.Router();
exports.router.route('/')
    .post(auth_1.protect, multer_1.multerUploads, productController_1.createProduct)
    .get(productController_1.getProducts);
exports.router.route('/:slug')
    .get(productController_1.getSingleProduct);
//# sourceMappingURL=productRoutes.js.map