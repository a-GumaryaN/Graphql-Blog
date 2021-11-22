"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentModel = exports.postModel = exports.personModel = void 0;
var mongoose_1 = require("mongoose");
var commentSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    content: { type: String, required: true }
});
var postSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    link: { type: String, required: false },
    keyword: [{ type: String, required: true }],
    averageLikes: { type: Number, required: false },
    comments: [Comment]
});
var personSchema = new mongoose_1.Schema({
    _id: { type: String, required: true },
    password: { type: String, required: true },
    fullName: {
        firstName: { type: String, required: false },
        lastName: { type: String, required: false }
    },
    age: { type: Number, required: false },
    posts: [{ type: postSchema }],
    description: { type: String, required: false }
});
exports.personModel = (0, mongoose_1.model)("person", personSchema);
exports.postModel = (0, mongoose_1.model)("person", postSchema);
exports.commentModel = (0, mongoose_1.model)("person", commentSchema);
