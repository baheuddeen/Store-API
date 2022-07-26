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
class OrderItem {
    // get user with certien id
    show(order_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_js_1.default.connect();
                const sql = 'SELECT * FROM order_item WHERE order_id=($1)';
                const products = yield conn.query(sql, [order_id]);
                conn.release();
                if (!products.rows[0])
                    throw Error(`no items for order = ${order_id}`);
                return products.rows;
            }
            catch (err) {
                throw new Error(`Error: ${err}`);
            }
        });
    }
    create(newOrderItem) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let conn = yield database_js_1.default.connect();
                let sql = 'SELECT price FROM products WHERE id =($1)';
                const price = yield conn.query(sql, [newOrderItem.product_id]);
                conn.release();
                if (!price.rowCount)
                    throw Error(`no product with this id ${newOrderItem.product_id}`);
                conn = yield database_js_1.default.connect();
                const totalPrice = newOrderItem.quantity * price.rows[0].price;
                sql = 'INSERT INTO order_item (order_id, product_id, quantity, price) VALUES ($1, $2, $3, $4) RETURNING *';
                const products = yield conn.query(sql, [newOrderItem.order_id, newOrderItem.product_id, newOrderItem.quantity, totalPrice]);
                conn.release();
                return products.rows[0];
            }
            catch (err) {
                throw new Error(`Error: ${err}`);
            }
        });
    }
}
exports.default = OrderItem;
