import { Schema, model } from "mongoose";

import { person, post, Comment } from "../interfaces/interfaces";

const commentSchema = new Schema<Comment>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    content: { type: String, required: true }
});

const postSchema = new Schema <post>({
    title: { type: String, required: true },
    content: { type: String, required: true },
    link: { type: String, required: false },
    keyword: [{ type: String, required: true }],
    averageLikes: { type: Number, required: false },
    comments: [Comment]
});

const personSchema = new Schema<person>({
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

export const personModel = model("person",personSchema);
export const postModel = model("person", postSchema);
export const commentModel = model("person", commentSchema);

