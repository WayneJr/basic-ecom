"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const mongoose_1 = __importStar(require("mongoose"));
// @ts-ignore
const mongoose_slug_generator_1 = __importDefault(require("mongoose-slug-generator"));
mongoose_1.default.plugin(mongoose_slug_generator_1.default);
const productSchema = new mongoose_1.Schema({
    owner: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User'
    },
    name: {
        type: String,
        required: [true, 'Please enter a name'],
        unique: [true, 'name already in use'],
        trim: true
    },
    slug: {
        type: String,
        slug: 'name'
    },
    description: {
        type: String,
        required: [true, "Please add a description"],
        trim: true,
    },
    price: {
        type: Number,
        required: [true, "Please add a price"],
        trim: true
    },
    availableStock: {
        type: Number,
        required: [true, "Please enter number of available stock"],
        trim: true
    },
    image: {
        type: String,
        required: [true, "Please add an image"],
        // unique: [true, "name already in use"],
        trim: true
    },
}, {
    timestamps: true
});
exports.Product = mongoose_1.default.model('Product', productSchema);
//# sourceMappingURL=Product.js.map