"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const verifySignup_1 = __importDefault(require("../../../utilities/verifySignup"));
const router = express_1.default.Router();
router.post('/', verifySignup_1.default, (req, res) => {
    res.cookie('_auth_type', 'internal');
});
exports.default = router;
