"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.secret = exports.Result = exports.token = void 0;
var graphql_1 = require("graphql");
exports.token = new graphql_1.GraphQLObjectType({
    name: "token",
    fields: {
        error: { type: graphql_1.GraphQLString },
        token: { type: graphql_1.GraphQLString }
    }
});
exports.Result = new graphql_1.GraphQLObjectType({
    name: "Result",
    fields: {
        error: { type: graphql_1.GraphQLString },
        result: { type: graphql_1.GraphQLString }
    }
});
exports.secret = "H~!d/<%1Fs*c%>?";
