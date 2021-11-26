"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.graphSchema = exports.Query = exports.Mutation = void 0;
var graphql_1 = require("graphql");
var graphql_2 = require("graphql");
var PersonMutation_1 = require("./schemas/PersonMutation");
var PostMutations_1 = require("./schemas/PostMutations");
var PersonQuery_1 = require("./schemas/PersonQuery");
var PostQuery_1 = require("./schemas/PostQuery");
exports.Mutation = new graphql_2.GraphQLObjectType({
    name: "Mutation",
    fields: {
        updatePerson: PersonMutation_1.updatePerson,
        register: PersonMutation_1.register,
        addPost: PostMutations_1.addPost,
        updatePost: PostMutations_1.updatePost,
        deletePost: PostMutations_1.deletePost,
        deleteAccount: PersonMutation_1.deleteAccount
    }
});
exports.Query = new graphql_2.GraphQLObjectType({
    name: "Query",
    fields: {
        login: PersonQuery_1.login,
        getPerson: PersonQuery_1.getPerson,
        getPost: PostQuery_1.getPost
    }
});
exports.graphSchema = new graphql_1.GraphQLSchema({
    query: exports.Query,
    mutation: exports.Mutation
});
