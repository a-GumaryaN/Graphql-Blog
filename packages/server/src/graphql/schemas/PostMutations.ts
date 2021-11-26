import { auth } from "../../modules/auth";

import { removeTags } from "../../modules/XSS";

import { GraphQLString, GraphQLInt } from "graphql";

import {
    postModel
} from "../../db/dbSchemas";

import { Post } from "./PostSchema";

import {
    secret,
    Result
} from "./dependensies";

import { post } from "../../modules/PostJoi";

export const addPost = {
    type: Post,
    args: {
        token: { type: GraphQLString },
        title: { type: GraphQLString },
        content: { type: GraphQLString }
    },
    resolve: async (parent, args) => {

        const { error } = post.addSchema.validate(args);
        if (error) return { error };

        const authResult: any = auth(args.token, secret);
        if (authResult.error) return { error: authResult.error };

        const ownerUsername = authResult.username,
            content = removeTags(args.content),
            title = removeTags(args.title);

        const newPost = new postModel({
            ownerUsername,
            content,
            title
        });

        const result = await newPost.save();

        if (!result) return { error: "error in saving..." };

        return result;

    }
};

export const updatePost = {
    type: Post,
    args: {
        token: { type: GraphQLString },
        title: { type: GraphQLString },
        content: { type: GraphQLString },
        link: { type: GraphQLString },
        averageLikes: { type: GraphQLInt }
    },
    resolve: async (parent, args) => {

        const { error } = post.UpdateSchema.validate(args);
        if (error) return { error };

        const authResult: any = auth(args.token, secret);
        if (authResult.error) return { error: authResult.error };

        delete args.token;

        const result = await postModel.updateOne(
            {
                ownerUsername: authResult.username
            },
            args
        );

        const Return = await postModel.findOne({
            ownerUsername: authResult.username
        });

        return Return;

    }
}

export const deletePost = {
    type: Result,
    args: {
        token: { type: GraphQLString },
        title: { type: GraphQLString }
    },
    resolve: async (parent, args) => {

        const { error } = post.DeleteSchema.validate(args);
        if (error) return { error };

        const authResult: any = auth(args.token, secret);
        if (authResult.error) return { error: authResult.error };

        const findResult = await postModel.findOne({
            ownerUsername: authResult.username,
            title: args.title
        });
        if (!findResult) return { error: "post not found..." };

        const result = await postModel.deleteMany({
            ownerUsername: authResult.username,
            title: args.title
        });
        return { result: `delete count : ${result.deletedCount}` };

    }
}