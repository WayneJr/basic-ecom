"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const router = express.Router();
const indexController_1 = require("../controllers/indexController");
router.get('/', indexController_1.root);
module.exports = router;
