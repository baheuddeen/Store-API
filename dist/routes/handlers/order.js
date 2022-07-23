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
const getPayloadFromJWT_1 = __importDefault(require("../../utilities/getPayloadFromJWT"));
const order_1 = __importDefault(require("../../models/db/order"));
const router = express_1.default.Router();
const order = new order_1.default();
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const content = (0, getPayloadFromJWT_1.default)(req.cookies._jwt);
    const userId = content.user_id;
    try {
        const selectedOrders = yield order.show(userId);
        res.json(selectedOrders);
    }
    catch (err) {
        res.status(400).send(`${err}`);
    }
});
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const content = (0, getPayloadFromJWT_1.default)(req.cookies._jwt);
    const newOrder = {
        id: Date.now(),
        user_id: content.user_id,
        status: 'active',
    };
    try {
        const createdOrder = yield order.create(newOrder);
        return res.json(createdOrder);
    }
    catch (err) {
        return res.status(400).send({ status: false, err: `${err}` });
    }
});
const complete = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const selectedOrders = yield order.complete(req.body.id);
        res.json(selectedOrders);
    }
    catch (err) {
        res.status(400).send(`${err}`);
    }
});
router.get('/', validateJWT_1.default, show);
router.post('/create', validateJWT_1.default, create);
router.post('/complete', validateJWT_1.default, complete);
exports.default = router;
