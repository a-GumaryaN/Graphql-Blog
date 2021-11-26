import {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString
} from "graphql";
import { Person } from "./PersonSchema";
import { personModel } from "../../db/dbSchemas";

export const Post = new GraphQLObjectType({
    name: "Post",
    fields: () => ({
        error: { type: GraphQLString },
        title: { type: GraphQLString },// id is title...
        content: { type: GraphQLString },
        link: { type: GraphQLString },
        ownerUsername: { type: GraphQLString },
        owner: {
            type: Person,
            resolve: async (parent) => {
                return await personModel.findOne({ _id: parent.ownerUsername })
            }
        },
        averageLikes: { type: GraphQLInt },
    })
});