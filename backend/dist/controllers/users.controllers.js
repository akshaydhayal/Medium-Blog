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
exports.signupUser = signupUser;
exports.signinUser = signinUser;
const client_1 = require("@prisma/client");
const generateJwtToken_1 = require("../utils/generateJwtToken");
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma = new client_1.PrismaClient();
function signupUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { username, email, password } = req.body;
            console.log(username, password);
            const hashedPassword = yield bcrypt_1.default.hash(password, 10);
            console.log(hashedPassword);
            const user = yield prisma.user.create({
                data: {
                    email, password: hashedPassword, username
                }
            });
            const token = (0, generateJwtToken_1.generateJwtToken)({ id: user.id });
            console.log(user);
            res.status(200).json({ user: user.email, token });
        }
        catch (e) {
            console.log("error in signUpUser Controller", e);
            res.status(501).json("Internal server error");
        }
    });
}
function signinUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { email, password } = req.body;
            const user = yield prisma.user.findUnique({
                where: { email }
            });
            if (!user) {
                return res.status(401).json("Wrong email, user don't exist!!");
            }
            const isValidPassword = yield bcrypt_1.default.compare(password, user.password);
            if (!isValidPassword) {
                return res.status(401).json("Wrong password!!");
            }
            const token = (0, generateJwtToken_1.generateJwtToken)({ id: user.id });
            res.status(200).json({ user: user.email, token });
        }
        catch (e) {
            console.log("error in signinUser Controller", e);
            res.status(501).json("Internal Server error");
        }
    });
}
