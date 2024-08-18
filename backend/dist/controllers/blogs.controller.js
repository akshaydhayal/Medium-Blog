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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllBlogs = getAllBlogs;
exports.getBlog = getBlog;
exports.createBlog = createBlog;
exports.updateBlog = updateBlog;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function getAllBlogs(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const posts = yield prisma.post.findMany();
            res.status(200).json(posts);
        }
        catch (e) {
            console.log("error in getAll Blogs controller", e);
            res.status(501).json("Internal server error");
        }
    });
}
function getBlog(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { blogId } = req.params;
            const blog = yield prisma.post.findUnique({
                where: { id: blogId }
            });
            if (!blog) {
                res.status(404).json("Blog not found");
            }
            res.status(200).json(blog);
        }
        catch (e) {
            console.log("error in getBlog controller", e);
            res.status(501).json("Internal server error");
        }
    });
}
function createBlog(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { title, content, userId } = req.body;
            const user = yield prisma.user.findUnique({
                where: { id: userId }
            });
            if (!user) {
                return res.status(404).json("User not found");
            }
            const post = yield prisma.post.create({
                data: {
                    title, content, likes: 0, authorId: userId
                }
            });
            console.log(post);
            res.status(201).json(post);
        }
        catch (e) {
            console.log("error in createBlog controller", e);
            res.status(501).json("Internal server error");
        }
    });
}
function updateBlog(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { blogId } = req.params;
            const { title, content, likes } = req.body;
            const blogExists = yield prisma.post.findUnique({
                where: { id: blogId }
            });
            if (!blogExists) {
                return res.status(404).json("Blog not found");
            }
            const post = yield prisma.post.update({
                where: { id: blogId },
                data: {
                    title, content, likes
                }
            });
            console.log(post);
            res.status(200).json(post);
        }
        catch (e) {
            console.log("error in updateBlog controller", e);
            res.status(501).json("Internal server error");
        }
    });
}
