"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataUri = exports.multerUploads = void 0;
const multer_1 = __importDefault(require("multer"));
const parser_1 = __importDefault(require("datauri/parser"));
const path_1 = __importDefault(require("path"));
// const multer = require('multer');
// const DataUri = require('datauri/parser');
// const path = require('path');
const storage = multer_1.default.memoryStorage();
const multerUploads = multer_1.default({ storage }).single('image');
exports.multerUploads = multerUploads;
const dUri = new parser_1.default();
/**
 * @description This function converts the buffer to data url
 * @param {Object} req containing the field object
 * @returns {DataURIParser} The data url from the string buffer
 */
const dataUri = (req) => {
    return dUri.format(path_1.default.extname(req.file.originalname).toString(), req.file.buffer);
};
exports.dataUri = dataUri;
//# sourceMappingURL=multer.js.map