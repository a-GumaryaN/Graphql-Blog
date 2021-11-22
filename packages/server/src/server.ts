import * as express  from "express";
const app=express();

const dbUrl="mongodb://localhost:27017/GraphBlog";

import { connect } from "mongoose";

import { graphqlHTTP } from "express-graphql";

const port:number=3000;

connect(dbUrl).then(()=>{
    console.log(`successfully connected to the database...`);
});

import { graphSchema } from "./graphql/schemas/graphSchemas";

app.use('/', graphqlHTTP({
    schema:graphSchema,
    graphiql:true
}));

app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
})