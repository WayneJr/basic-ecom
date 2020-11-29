"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const express = require('express');
const express_1 = __importDefault(require("express"));
const indexRoutes = require('./api/routes/indexRoutes');
const app = express_1.default();
const port = process.env.PORT || 3000;
app.use(indexRoutes);
app.listen(port, () => console.log(`listening on port: ${port}`));
