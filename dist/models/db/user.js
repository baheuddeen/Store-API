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
const bcrypt_1 = __importDefault(require("bcrypt"));
const database_js_1 = __importDefault(require("../../database.js"));
class User {
    // retrive all users
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_js_1.default.connect();
                const sql = 'SELECT id, first_name, last_name, email FROM users';
                const students = yield conn.query(sql);
                conn.release();
                return students.rows;
            }
            catch (err) {
                throw new Error(`Error: ${err}`);
            }
        });
    }
    // get user with id
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_js_1.default.connect();
                const sql = 'SELECT id, first_name, last_name, email FROM users WHERE id=($1)';
                const students = yield conn.query(sql, [id]);
                conn.release();
                if (!students.rows[0])
                    throw Error(`no user with id = ${id}`);
                return students.rows[0];
            }
            catch (err) {
                throw new Error(`${err}`);
            }
        });
    }
    create(newUser) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const salt = bcrypt_1.default.genSaltSync(10);
                const password = bcrypt_1.default.hashSync(newUser.password, salt);
                const conn = yield database_js_1.default.connect();
                const sql = 'INSERT INTO users (first_name, last_name, password, email) VALUES ($1, $2, $3, $4) RETURNING *';
                const students = yield conn.query(sql, [newUser.firstName, newUser.lastName, password, newUser.email]);
                conn.release();
                return students.rows[0];
            }
            catch (err) {
                throw new Error(`Error: ${err}`);
            }
        });
    }
    getPassword(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_js_1.default.connect();
                const sql = 'SELECT password FROM users WHERE email=($1)';
                const students = yield conn.query(sql, [email]);
                conn.release();
                if (students.rows.length == 0) {
                    throw new Error('this email is not exist');
                }
                return students.rows[0].password;
            }
            catch (err) {
                throw new Error(`Error: ${err}`);
            }
        });
    }
    getUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_js_1.default.connect();
                const sql = 'SELECT id, first_name, last_name, email FROM users WHERE email=($1)';
                const user = yield conn.query(sql, [`${email}`]);
                conn.release();
                if (user.rowCount == 0) {
                    throw new Error('this email is not exist WOW!');
                }
                return user.rows[0];
            }
            catch (err) {
                throw new Error(`Error: ${err}`);
            }
        });
    }
}
exports.default = User;
