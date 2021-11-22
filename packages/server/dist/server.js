"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var app = express();
var dbUrl = "mongodb://localhost:27017/GraphBlog";
var mongoose_1 = require("mongoose");
var express_graphql_1 = require("express-graphql");
var port = 3000;
(0, mongoose_1.connect)(dbUrl).then(function () {
    console.log("successfully connected to the database...");
});
var graphSchemas_1 = require("./graphql/schemas/graphSchemas");
app.use('/', (0, express_graphql_1.graphqlHTTP)({
    schema: graphSchemas_1.graphSchema,
    graphiql: true
}));
app.listen(port, function () {
    console.log("server is running on port " + port);
});
