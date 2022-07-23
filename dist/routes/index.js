"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const auth_js_1 = __importDefault(require("./api/auth/auth.js"));
const user_1 = __importDefault(require("./handlers/user"));
const product_1 = __importDefault(require("./handlers/product"));
const order_1 = __importDefault(require("./handlers/order"));
const order_item_1 = __importDefault(require("./handlers/order_item"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const validateJWT_js_1 = __importDefault(require("../utilities/validateJWT.js"));
var router = express_1.default.Router();
router.use(body_parser_1.default.json());
router.use((0, cookie_parser_1.default)());
// users
router.use('/users', user_1.default);
// Authenication
router.use('/auth', auth_js_1.default);
// products
router.use('/products', product_1.default);
// orders
router.use('/orders', order_1.default);
// orders
router.use('/order_item', order_item_1.default);
//protected get
router.get('/protected', validateJWT_js_1.default, (_req, res) => {
    return res.json({ msg: 'congratulation you are signed in!' });
});
//post test
router.post('/test', (req, res) => {
    res.send(req.query.a);
});
exports.default = router;
