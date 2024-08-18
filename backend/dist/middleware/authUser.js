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
exports.authUser = authUser;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function authUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        let token = '';
        if (typeof (req.headers.jwttoken) == 'string') {
            token = req.headers.jwttoken ? req.headers.jwttoken : "";
        }
        const jwtSecret = process.env.JWT_SECRET;
        let decodeToken = null;
        if (jwtSecret) {
            decodeToken = jsonwebtoken_1.default.verify(token, jwtSecret);
        }
        if (!decodeToken) {
            return res.status(401).json({ msg: 'Inavlid JWT Token' });
        }
        if (typeof (decodeToken) != 'string') {
            req.headers.userId = decodeToken.id;
        }
        next();
    });
}
