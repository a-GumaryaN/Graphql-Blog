import {
    GraphQLString
} from "graphql";

import {
    postModel
} from "../../db/dbSchemas";

import { Post } from "./PostSchema";

export const getPost= {
    type: Post,
        args: {
        ownerUsername: { type: GraphQLString },
        title: { type: GraphQLString }
    },
    resolve: async (parent, args) => {
        const result = await postModel.findOne(args);
        console.log(result);
        return result;
    }
};