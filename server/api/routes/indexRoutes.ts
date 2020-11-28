import express = require("express");
const router: express.Router = express.Router();

import { root } from "../controllers/indexController";

router.get("/", root);

module.exports = router;
