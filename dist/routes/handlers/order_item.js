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
const validateJWT_1 = __importDefault(require("../../utilities/validateJWT"));
const order_item_1 = __importDefault(require("../../models/db/order_item"));
const router = express_1.default.Router();
const orderItem = new order_item_1.default();
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const selectedutems = yield orderItem.show(parseInt(req.params.id, 10));
        res.json(selectedutems);
    }
    catch (err) {
        res.status(400).send(`${err}`);
    }
});
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const createdOrder = yield orderItem.create(req.body);
        return res.json(createdOrder);
    }
    catch (err) {
        return res.status(400).send({ status: false, err: `${err}` });
    }
});
router.get('/:id', validateJWT_1.default, show);
router.post('/create', validateJWT_1.default, create);
exports.default = router;
