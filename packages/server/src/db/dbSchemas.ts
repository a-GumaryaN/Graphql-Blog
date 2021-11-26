import { Schema, model } from "mongoose";

import { person, post, Comment } from "../interfaces/interfaces";

const commentSchema = new Schema<Comment>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    content: { type: String, required: true }
});

const postSchema = new Schema<post>({
    ownerUsername: { type: String, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    link: { type: String, required: false },
    averageLikes: { type: Number, required: false },
    // keyword: [{ type: String, required: true }],
    // comments: [commentSchema]
});

const personSchema = new Schema<person>({
    _id: { type: String, required: true },//id is username
    password: { type: String, required: true },
    firstName: { type: String },
    lastName: { type: String },
    age: { type: Number, required: false },
    posts: [{ type: postSchema }],
    description: { type: String, required: false }
});

export const personModel = model("person", personSchema);
export const postModel = model("post", postSchema);
export const commentModel = model("comment", commentSchema);

