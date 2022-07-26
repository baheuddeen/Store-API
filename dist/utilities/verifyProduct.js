"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const schema = joi_1.default.object({
    name: joi_1.default.string().min(1).required(),
    price: joi_1.default.number().required(),
    category: joi_1.default.string(),
});
function verifyProduct(req, res, next) {
    const error = schema.validate(req.body).error;
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    next();
}
exports.default = verifyProduct;
