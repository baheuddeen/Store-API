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
const user_1 = __importDefault(require("../../models/db/user"));
const express_1 = __importDefault(require("express"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const verifySignup_js_1 = __importDefault(require("../../utilities/verifySignup.js"));
const verifyLogin_1 = __importDefault(require("../../utilities/verifyLogin"));
const generateJWT_1 = __importDefault(require("../../utilities/generateJWT"));
const validateJWT_1 = __importDefault(require("../../utilities/validateJWT"));
const getPayloadFromJWT_1 = __importDefault(require("../../utilities/getPayloadFromJWT"));
const router = express_1.default.Router();
const user = new user_1.default();
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user.index();
    res.json(users);
});
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id, 10);
    try {
        const selctedUser = yield user.show(id);
        res.json(selctedUser);
    }
    catch (err) {
        res.status(400).send(`${err}`);
    }
});
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = req.body;
    try {
        const createdUser = yield user.create(newUser);
        res.cookie('_jwt', (0, generateJWT_1.default)(createdUser));
        return res.send('signed up successfully');
    }
    catch (err) {
        return res.status(400).send({ status: false, err: `${err}` });
    }
});
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const password = yield user.getPassword(req.body.email);
    const valid = bcrypt_1.default.compareSync(req.body.password, password);
    if (!valid) {
        return res.status(401).json({ msg: 'unvalid passeord' });
    }
    res.cookie('_jwt', (0, generateJWT_1.default)(req.body.email));
    res.send('logged in successfully !');
});
const userInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payload = (0, getPayloadFromJWT_1.default)(req.cookies._jwt);
        const id = payload.user_id;
        const userData = yield user.show(id);
        return res.json(userData);
    }
    catch (_a) {
        return res.status(401).json({ msg: 'please signin first' });
    }
});
router.get('/', validateJWT_1.default, index);
router.get('/userInfo', validateJWT_1.default, userInfo);
router.get('/:id', validateJWT_1.default, show);
router.post('/create', verifySignup_js_1.default, create);
router.post('/login', verifyLogin_1.default, login);
exports.default = router;
