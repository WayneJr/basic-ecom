import {Request, Response, NextFunction} from 'express';
const {config, uploader} = require('cloudinary').v2;

const cloudinaryConfig = (req: Request, res: Response, next: NextFunction) => {
    config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.API_KEY,
        api_secret: process.env.API_SECRET
    });
    next();
}

export { cloudinaryConfig, uploader };

