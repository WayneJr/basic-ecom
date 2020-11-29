"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name']
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please add a valid email']
    },
    role: {
        type: String,
        enum: ['admin', 'customer'],
        default: 'customer'
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        select: false
    }
}, {
    timestamps: true
});
exports.User = mongoose_1.default.model('User', userSchema);
// export mode;
//# sourceMappingURL=User.js.map