"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const schema = joi_1.default.object({
    email: joi_1.default.string().email().min(5).required(),
    password: joi_1.default.string().min(6).required(),
});
function verifySignup(req, res, next) {
    const error = schema.validate(req.body).error;
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    next();
}
exports.default = verifySignup;
