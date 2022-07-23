"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function validateJWT(req, res, next) {
    const token = req.cookies['_jwt'];
    try {
        const value = googleAccount(token);
        if (value) {
            next();
        }
    }
    catch (err) { }
    try {
        const value = internalAccount(token);
        if (value) {
            next();
        }
    }
    catch (err) { }
    return res.status(401).json({ msg: 'please signin first ..' });
}
exports.default = validateJWT;
function internalAccount(token) {
    return jsonwebtoken_1.default.verify(token, 'client_secret');
}
function googleAccount(token) {
    // public certificate
    // https://www.googleapis.com/oauth2/v1/certs
    let secret = "-----BEGIN CERTIFICATE-----\nMIIDJjCCAg6gAwIBAgIId3xPl4cPKh0wDQYJKoZIhvcNAQEFBQAwNjE0MDIGA1UE\nAwwrZmVkZXJhdGVkLXNpZ25vbi5zeXN0ZW0uZ3NlcnZpY2VhY2NvdW50LmNvbTAe\nFw0yMjA2MjQxNTIxNTlaFw0yMjA3MTEwMzM2NTlaMDYxNDAyBgNVBAMMK2ZlZGVy\nYXRlZC1zaWdub24uc3lzdGVtLmdzZXJ2aWNlYWNjb3VudC5jb20wggEiMA0GCSqG\nSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDLFEiG1xHTWjedvqFec+PVTYVs2Do2gvYo\naQkYHlAtYxXuox3G8f+g6w/+yrvUSc1fOeZRzsW8r1F+hDHLUkYUzqArOQj7CpfA\nVWGkLNapbWlxzOgnw5Ne2bWW1Y7rcoXKHY2knooU5Uiceo2g/z9BbAITX+p8RCvJ\n6yG/mEE8aC7d7oO4P1LMnSFMYeuKdsRHx3GasZwGup7K+ox0PECKxho/E0Q4BOFI\nigaTkm5D10dZC1hkp+jL293SRUWfIemyzemATDiufR5+v8aa8XlX8kasyQ5omynw\n3+qm6da0f8Dteg+uMjDYDY1T9k56+3Tt/MpmPCzV3QceaccDs9azAgMBAAGjODA2\nMAwGA1UdEwEB/wQCMAAwDgYDVR0PAQH/BAQDAgeAMBYGA1UdJQEB/wQMMAoGCCsG\nAQUFBwMCMA0GCSqGSIb3DQEBBQUAA4IBAQBUYM/QEuMEjqq/NHtd6w5tOL8FOkat\n+2d3txRwIhDWaMOyDeM53Tufp1yhRpp3K46NnTkZRE6h4mGN7VPJWSED6s1FQGxA\n2C6WkjnDshNxVzOh8+eZt3l8/gfzaR6lfMNH6NYoInl22GoS/46XRE3qY7RO9uVk\nj8Uou1L6YdOPFA9buTjLHbJViGpz2vTt67C6ZMRC/exWINs8914buqXH2T99xJJM\nT1FVInIpj+AROcjCnONerT/M0hrhTqGZy0WHsEXy7fZX/8EsJ79LXHkcR/tooO1s\nygZ79Xxy/2JDCH3QouXQJOs8iV697+3macsmzm9g/xBKXyllkEq3Q1xh\n-----END CERTIFICATE-----\n";
    try {
        jsonwebtoken_1.default.verify(token, secret, { algorithms: ['RS256'] });
        return true;
    }
    catch (err) {
        return false;
    }
}
