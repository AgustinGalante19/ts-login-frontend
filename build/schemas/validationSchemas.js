"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productSchema = exports.userSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.userSchema = joi_1.default.object({
    username: joi_1.default.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
    email: joi_1.default.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'es'] } }),
    password: joi_1.default.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    repeat_password: joi_1.default.ref('password'),
}).with('password', 'repeat_password');
exports.productSchema = joi_1.default.object({
    name: joi_1.default.string().required(),
    brand: joi_1.default.string().required(),
    model: joi_1.default.string().required(),
    quantity: joi_1.default.number().required(),
});
