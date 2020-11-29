import multer from 'multer';
import Datauri from 'datauri/parser'
import path from "path";
import {Request} from "express";
// const multer = require('multer');
// const DataUri = require('datauri/parser');
// const path = require('path');

const storage = multer.memoryStorage();
const multerUploads = multer({ storage }).single('image');

const dUri = new Datauri();

/**
 * @description This function converts the buffer to data url
 * @param {Object} req containing the field object
 * @returns {DataURIParser} The data url from the string buffer
 */

const dataUri = (req: Request) => {
    return dUri.format(path.extname(req.file.originalname).toString(), req.file.buffer);
}

export { multerUploads, dataUri };
