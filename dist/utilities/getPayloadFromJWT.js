"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.default = (jwt) => {
    let clientSecret = process.env.JWT_CLIENT_SECRET || 'client-secret';
    const payLoad = jsonwebtoken_1.default.verify(jwt, clientSecret);
    if (payLoad) {
        const content = JSON.parse(JSON.stringify(payLoad));
        return content;
    }
    throw new Error('not valid jwt');
};
