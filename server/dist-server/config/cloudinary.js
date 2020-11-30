"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploader = exports.cloudinaryConfig = void 0;
const { config, uploader } = require('cloudinary').v2;
exports.uploader = uploader;
const cloudinaryConfig = (req, res, next) => {
    config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.API_KEY,
        api_secret: process.env.API_SECRET
    });
    next();
};
exports.cloudinaryConfig = cloudinaryConfig;
//# sourceMappingURL=cloudinary.js.map