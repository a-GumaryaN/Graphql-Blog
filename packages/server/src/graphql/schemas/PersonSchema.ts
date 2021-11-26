import {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLID,
    GraphQLList
} from "graphql";

import { person } from "../../interfaces/interfaces";
import { Post } from "./PostSchema";
import { postModel } from "../../db/dbSchemas";

export const Person = new GraphQLObjectType<person>({
    name: "Person",
    fields: () => ({
        error: { type: GraphQLString },
        username: { type: GraphQLID },
        _id: { type: GraphQLID },
        password: { type: GraphQLString },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        age: { type: GraphQLInt },
        posts: {
            type: GraphQLList(Post),
            resolve: async (parent, args) => {
                return await postModel.find({ ownerUsername: parent._id });
            }
        },
        description: { type: GraphQLString }
    })
});