"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
// const express = require('express');
const router = express_1.default.Router();
exports.router = router;
const indexController_1 = require("../controllers/indexController");
// const { root } = require( "../controllers/indexController");
router.get("/", indexController_1.root);
router.post('/register', indexController_1.register);
router.post('/login', indexController_1.login);
//# sourceMappingURL=indexRoutes.js.map