"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.graphSchema = void 0;
var graphql_1 = require("graphql");
var Query = new graphql_1.GraphQLObjectType({
    name: "Query",
    fields: {}
});
var Mutation = new graphql_1.GraphQLObjectType({
    name: "Mutation",
    fields: {}
});
exports.graphSchema = new graphql_1.GraphQLSchema({ query: Query, mutation: Mutation });
