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
const product_1 = __importDefault(require("../../models/db/product"));
const express_1 = __importDefault(require("express"));
const validateJWT_1 = __importDefault(require("../../utilities/validateJWT"));
const verifyProduct_1 = __importDefault(require("../../utilities/verifyProduct"));
const router = express_1.default.Router();
const product = new product_1.default();
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield product.index();
    res.json(users);
});
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id, 10);
    try {
        const selctedProduct = yield product.show(id);
        res.json(selctedProduct);
    }
    catch (err) {
        res.status(400).send(`${err}`);
    }
});
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newProduct = req.body;
    try {
        const createdProduct = yield product.create(newProduct);
        return res.json(createdProduct);
    }
    catch (err) {
        return res.status(400).send({ status: false, err: `${err}` });
    }
});
router.get('/', index);
router.get('/:id', show);
router.post('/create', validateJWT_1.default, verifyProduct_1.default, create);
exports.default = router;
