"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function internalAccount(token) {
    let clientSecret = process.env.JWT_CLIENT_SECRET || 'client-secret';
    return jsonwebtoken_1.default.verify(token, clientSecret);
}
function googleAccount(token) {
    return __awaiter(this, void 0, void 0, function* () {
        // public certificate
        // https://www.googleapis.com/oauth2/v1/certs
        var res = yield axios_1.default.get('https://www.googleapis.com/oauth2/v1/certs');
        for (let key in res.data) {
            let secret = res.data[key];
            try {
                jsonwebtoken_1.default.verify(token, secret, { algorithms: ['RS256'] });
                return true;
            }
            catch (_err) {
                continue;
            }
        }
        return false;
    });
}
function validateJWT(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = req.cookies._jwt;
        try {
            const value = yield googleAccount(token);
            if (value) {
                return next();
            }
        }
        catch (err) { }
        try {
            const value = internalAccount(token);
            if (value) {
                return next();
            }
        }
        catch (err) { }
        return res.status(401).json({ msg: 'please signin first ..' });
    });
}
exports.default = validateJWT;
