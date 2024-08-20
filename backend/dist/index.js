"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const userRouter_1 = __importDefault(require("./routes/userRouter"));
const blogRouter_1 = __importDefault(require("./routes/blogRouter"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
dotenv_1.default.config();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: ['http://localhost:5173', 'http://localhost:5174'],
    methods: ['PUT'],
}));
//post - api/v1/users/signup
//post - api/v1/users/signin
//post - api/v1/blogs/create
//put - api/v1/blogs/:blogId 
//get - api/v1/blogs
//get - api/v1/blogs/:blogId
app.use("/api/v1/users/", userRouter_1.default);
app.use("/api/v1/blogs/", blogRouter_1.default);
const port = process.env.PORT ? process.env.PORT : 3001;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
