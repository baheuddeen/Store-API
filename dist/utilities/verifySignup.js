"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const schema = joi_1.default.object({
    first_name: joi_1.default.string().required().max(50),
    last_name: joi_1.default.string().required().max(50),
    email: joi_1.default.string().email().min(5).required(),
    password: joi_1.default.string().min(8).required(),
});
function verifySignup(req, res, next) {
    console.log(req.body);
    const error = schema.validate(req.body).error;
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    next();
}
exports.default = verifySignup;
