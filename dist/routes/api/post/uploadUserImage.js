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
// import { promises as fs } from 'fs';
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const dirnameAbs = path_1.default.resolve();
const imagesDirPath = path_1.default.join(dirnameAbs, '/static/_assets/images/users');
const upload = (0, multer_1.default)({
    limits: { fieldSize: 10 * 1024 * 1024 },
    storage: multer_1.default.diskStorage({
        filename: function (req, file, callback) {
            callback(null, file.originalname);
        },
        destination: function (req, file, callback) {
            callback(null, imagesDirPath);
        },
    }),
});
const router = express_1.default.Router();
router.post('/', upload.single('image'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.file, req.body);
    res.send('successeded');
}));
exports.default = router;
