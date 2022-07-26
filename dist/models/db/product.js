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
const database_js_1 = __importDefault(require("../../database.js"));
class Product {
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_js_1.default.connect();
                const sql = 'SELECT * FROM products';
                const products = yield conn.query(sql);
                conn.release();
                return products.rows;
            }
            catch (err) {
                throw new Error(`Error: ${err}`);
            }
        });
    }
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_js_1.default.connect();
                const sql = 'SELECT * FROM products WHERE id=($1)';
                const products = yield conn.query(sql, [id]);
                conn.release();
                if (!products.rows[0])
                    throw Error(`no user with id = ${id}`);
                return products.rows[0];
            }
            catch (err) {
                throw new Error(`Error: ${err}`);
            }
        });
    }
    create(newProduct) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_js_1.default.connect();
                const sql = 'INSERT INTO products (name, price, category) VALUES ($1, $2, $3) RETURNING *';
                const products = yield conn.query(sql, [newProduct.name, newProduct.price, newProduct.category]);
                conn.release();
                return products.rows[0];
            }
            catch (err) {
                throw new Error(`Error: ${err}`);
            }
        });
    }
}
exports.default = Product;
