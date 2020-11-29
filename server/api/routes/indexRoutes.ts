import express from 'express';
// const express = require('express');
const router:express.Router = express.Router();

import { root, register, login } from '../controllers/indexController';
// const { root } = require( "../controllers/indexController");

router.get("/", root);
router.post('/register', register);
router.post('/login', login);

export {router};
