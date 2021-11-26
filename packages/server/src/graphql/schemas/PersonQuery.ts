import * as joi from "joi";

import { hasher } from "../../modules/modules";

import { sign, decode } from "jsonwebtoken";

import { removeTags } from "../../modules/XSS";

const PersonRegisterSchema = joi.object({
    username: joi.string()
        .required(),
    password: joi.string()
        .required()
});

const PostSchema = joi.object({
    ownerUsername: joi.string()
        .required(),
    username: joi.string()// _id is post title
        .required(),
    post: joi.string()
        .required(),
    link: joi.string(),
    averageLikes: joi.string()
});

import {
    GraphQLString
} from "graphql";

import {
    personModel
} from "../../db/dbSchemas";

import { Person } from "./PersonSchema"
import { Post } from "./PostSchema";
import { token, secret } from "./dependensies";



export const login= {
    type: token,
        args: {
        username: { type: GraphQLString },
        password: { type: GraphQLString }
    },
    resolve: async (parent, args) => {
        const { error } = PersonRegisterSchema.validate(args);
        if (error) return error;

        const username = removeTags(args.username),
            password = hasher(
                "md5",
                removeTags(args.password),
                "utf-8",
                "hex"
            );

        const result = await personModel.findOne({ _id:username });

        if (!result) return { error: "user not found...", token: null };

        if (result.password !== password) return {
            error: "password not valid...",
            token: null
        };

        const token: string = sign({
            username: result._id,
            password: result.password
        }, secret,
            { expiresIn: "60h" }
        );

        return { error: null, token: token };

    }
};
export const getPerson= {
    type: Person,
        args: {
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        username: { type: GraphQLString }
    },
    resolve: async (parent, args) => {

        const result = await personModel.findOne({_id:args.username});

        return result;
    }
};