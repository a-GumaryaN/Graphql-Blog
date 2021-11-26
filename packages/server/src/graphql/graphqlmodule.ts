import { GraphQLSchema } from "graphql";

import {
    GraphQLObjectType
} from "graphql";

import { updatePerson, register, deleteAccount } from "./schemas/PersonMutation";
import { addPost, updatePost, deletePost } from "./schemas/PostMutations";

import { login, getPerson } from "./schemas/PersonQuery";
import { getPost } from "./schemas/PostQuery";

export const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        updatePerson,
        register,
        addPost,
        updatePost,
        deletePost,
        deleteAccount
    }
});

export const Query = new GraphQLObjectType({
    name: "Query",
    fields: {
        login,
        getPerson,
        getPost
    }
});

export const graphSchema = new GraphQLSchema({
    query: Query,
    mutation: Mutation
});