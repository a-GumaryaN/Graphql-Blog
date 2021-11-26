
import { GraphQLObjectType, GraphQLString } from "graphql";

export const token = new GraphQLObjectType({
    name: "token",
    fields: {
        error: { type: GraphQLString },
        token: { type: GraphQLString }
    }
});

export const Result = new GraphQLObjectType({
    name: "Result",
    fields: {
        error: { type: GraphQLString },
        result: { type: GraphQLString }
    }
});

export const secret: string = "H~!d/<%1Fs*c%>?"
