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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = exports.login = exports.root = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const User_1 = require("../../models/User");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const express_validator_1 = require("express-validator");
const root = (req, res, next) => {
    res.send("<h1>Index route ni e</h1>");
};
exports.root = root;
const register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;
    console.log(req.body);
    try {
        let user = yield User_1.User.findOne({ email });
        if (user) {
            // @ts-ignore
            return res.status(400).json({ msg: `${user.modelName} exists` });
        }
        user = yield User_1.User.create({ name, email, password });
        const salt = yield bcryptjs_1.default.genSalt(10);
        // @ts-ignore
        user.password = yield bcryptjs_1.default.hash(password, salt);
        yield user.save();
        // @ts-ignore
        jsonwebtoken_1.default.sign({ user }, process.env.JWT_SECRET, (err, token) => {
            if (err)
                throw err;
            res.status(200).json({
                success: true,
                data: { token }
            });
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).send({
            success: false,
            message: 'Error In saving User'
        });
    }
});
exports.register = register;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
        let user = yield User_1.User.findOne({ email }).select('+password');
        console.log(user);
        if (!user)
            return res.status(400).json({ message: `${User_1.User.modelName} doesn't exist` });
        // @ts-ignore
        const isMatch = yield bcryptjs_1.default.compare(password, user.password);
        if (!isMatch)
            return res.status(400).json({ message: 'Incorrect Password' });
        // @ts-ignore
        jsonwebtoken_1.default.sign({ user }, process.env.JWT_SECRET, (err, token) => {
            if (err)
                throw err;
            res.status(200).json({
                success: true,
                data: { token }
            });
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Server Error',
            details: err
        });
    }
});
exports.login = login;
// module.exports = {
//   root: root,
//   login: async function(req:any, res:any, next:any) {
//     login(req, res, next)
//         .then(() => console.log('User successfully logged in'));
//   },
//   register: async function(req:any, res:any, next:any) {
//     register(req, res, next)
//         .then(() => console.log('User successfully added'));
//   },
//
// };
//# sourceMappingURL=indexController.js.map