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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const axios_1 = __importDefault(require("axios"));
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
        const certificate = yield (0, axios_1.default)('https://www.googleapis.com/oauth2/v1/certs');
        const cers = certificate.data;
        for (let cer in cers) {
            const secret = cers[cer];
            try {
                jsonwebtoken_1.default.verify(token, secret, { algorithms: ['RS256'] });
                return true;
            }
            catch (err) {
            }
        }
        return false;
    });
}
function typeJWT(token) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const value = yield googleAccount(token);
            if (value) {
                return 'googleAccount';
            }
        }
        catch (err) { }
        try {
            const value = internalAccount(token);
            if (value) {
                return 'internalAccount';
            }
        }
        catch (err) { }
        return 'invalidJWT';
    });
}
exports.default = typeJWT;
