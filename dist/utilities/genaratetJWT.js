"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function setJWT(email) {
    const jwt = jsonwebtoken_1.default.sign({
        "sub": "1234567890",
        "email": email,
        "user": true
    }, 'client_secret');
    return jwt;
}
exports.default = setJWT;
