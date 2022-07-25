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
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const router = express_1.default.Router();
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.query.code) {
        const result = yield (0, axios_1.default)({
            'method': 'post',
            'baseURL': 'https://oauth2.googleapis.com/token',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            params: {
                code: `${req.query.code}`,
                clientId: '174116080206-49l68to1e08ni1nlv9savvu0m1r8qkkm.apps.googleusercontent.com',
                client_secret: process.env.GOOGLE_CLIENT_SECRET,
                redirect_uri: 'http://localhost:3000/api/auth',
                grant_type: 'authorization_code',
            },
        });
        console.log(result.data);
        res.cookie('_jwt', result.data.id_token);
        res.cookie('_openId_access_token', result.data.access_token);
        res.cookie('_openId_refresh_token', result.data.refresh_token);
        res.writeHead(301, { Location: 'http://localhost:3000/' });
        return res.send();
    }
    res.send('some thing went wrong');
}));
exports.default = router;
