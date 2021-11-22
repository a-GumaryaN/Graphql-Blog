import {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
    GraphQLID,
    GraphQLList,
    GraphQLInputObjectType
} from "graphql";

const Query = new GraphQLObjectType({
    name: "Query",
    fields: {

    }
});

const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {

    }
});

export const graphSchema = new GraphQLSchema({ query: Query, mutation: Mutation });