"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.default = (jwt) => {
    const payLoad = jsonwebtoken_1.default.verify(jwt, 'client_secret');
    if (payLoad) {
        const email = JSON.parse(JSON.stringify(payLoad))['email'];
        return email;
    }
    throw new Error("not valid jwt");
};
