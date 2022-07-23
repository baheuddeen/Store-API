"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function generateJWT(user) {
    let clientSecret = process.env.JWT_CLIENT_SECRET || 'client-secret';
    const jwt = jsonwebtoken_1.default.sign({
        'sub': '1234567890',
        'email': user.email,
        'user_id': user.id,
        'user': true,
    }, clientSecret);
    return jwt;
}
exports.default = generateJWT;
