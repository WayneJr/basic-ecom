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
exports.authorize = exports.protect = void 0;
const User_1 = require("../../models/User");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const errorResponse_1 = require("../utils/errorResponse");
const protect = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let token;
    console.log(req.headers.authorization);
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }
    console.log(token);
    // else if(req.cookies.token) {
    //     token = req.cookies.token
    // }
    if (!token) {
        return next(new errorResponse_1.ErrorResponse('Not authorized to access', 401));
    }
    try {
        // @ts-ignore
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        console.log(decoded);
        // @ts-ignore
        req.user = yield User_1.User.findById(decoded.user._id);
        // @ts-ignore
        console.log(req.user);
        next();
    }
    catch (err) {
        console.error(err);
    }
});
exports.protect = protect;
const authorize = (...roles) => {
    return (req, res, next) => {
        // @ts-ignore
        if (!roles.includes(req.user.role)) {
            // @ts-ignore
            return next(new errorResponse_1.ErrorResponse(`User role ${req.user.role} is not authorized`, 401));
        }
        next();
    };
};
exports.authorize = authorize;
//# sourceMappingURL=auth.js.map