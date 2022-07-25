"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { POSTGRES_HOSTNAME, POSTGRES_DATABASE_DEV, POSTGRES_DATABASE_TEST, POSTGRES_USERNAME, POSTGRES_PASSWORD, ENV, } = process.env;
console.log(ENV);
console.log(ENV == 'test', ENV);
const client = new pg_1.Pool({
    host: POSTGRES_HOSTNAME,
    database: (ENV == 'test') ? POSTGRES_DATABASE_TEST : POSTGRES_DATABASE_DEV,
    user: POSTGRES_USERNAME,
    password: POSTGRES_PASSWORD,
});
exports.default = client;
