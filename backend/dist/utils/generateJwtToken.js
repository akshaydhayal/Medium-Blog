"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateJwtToken = generateJwtToken;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function generateJwtToken(payload) {
    const jwtSecret = process.env.JWT_SECRET;
    let token = '';
    if (jwtSecret) {
        token = jsonwebtoken_1.default.sign(payload, jwtSecret);
    }
    return token;
}
