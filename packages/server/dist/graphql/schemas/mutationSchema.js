"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mutation = void 0;
var graphql_1 = require("graphql");
var PersonMutation_1 = require("./PersonMutation");
exports.Mutation = new graphql_1.GraphQLObjectType({
    name: "Mutation",
    fields: { updatePerson: PersonMutation_1.updatePerson, register: PersonMutation_1.register }
});
