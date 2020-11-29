"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const indexRoutes_1 = require("./api/routes/indexRoutes");
// const indexRoutes = require('./api/routes/indexRoutes');
const app = express_1.default();
const port = process.env.PORT || 3000;
const dbUrl = process.env.DATABASE_URL;
// @ts-ignore
mongoose_1.default.connect(dbUrl, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => console.log('connected'))
    .catch(error => console.log(error));
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use('/api/v1/auth', indexRoutes_1.router);
app.listen(port, () => console.log(`listening on port: ${port}`));
//# sourceMappingURL=server.js.map