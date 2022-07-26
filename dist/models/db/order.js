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
class Order {
    // get user with certien id
    show(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_js_1.default.connect();
                const sql = 'SELECT * FROM orders WHERE user_id=($1)';
                const products = yield conn.query(sql, [user_id]);
                conn.release();
                if (!products.rows[0])
                    throw Error(`no order for id = ${user_id}`);
                return products.rows;
            }
            catch (err) {
                throw new Error(`Error: ${err}`);
            }
        });
    }
    create(newOrder) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_js_1.default.connect();
                const sql = 'INSERT INTO orders (id, user_id, status) VALUES ($1, $2, $3) RETURNING *';
                const products = yield conn.query(sql, [newOrder.id, newOrder.user_id, newOrder.status]);
                conn.release();
                return products.rows[0];
            }
            catch (err) {
                throw new Error(`Error: ${err}`);
            }
        });
    }
    complete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_js_1.default.connect();
                const sql = 'Update orders SET status = $1 WHERE id = $2 RETURNING *';
                const products = yield conn.query(sql, ['completed', id]);
                conn.release();
                if (!products.rows[0])
                    throw Error(`no order with id = ${id}`);
                return products.rows[0];
            }
            catch (err) {
                throw new Error(`Error: ${err}`);
            }
        });
    }
}
exports.default = Order;
