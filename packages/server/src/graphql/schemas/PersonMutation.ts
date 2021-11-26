import * as joi from "joi";

import { hasher } from "../../modules/modules";

import { auth } from "../../modules/auth";

import { removeTags } from "../../modules/XSS";

import {
    GraphQLInt,
    GraphQLString
} from "graphql";

import {
    personModel, postModel
} from "../../db/dbSchemas";

import { Person } from "./PersonSchema"

import { person } from "../../modules/PersonJoi"

import { secret, Result } from "./dependensies";



export const register = {
    type: Person,
    args: {
        username: { type: GraphQLString },
        password: { type: GraphQLString }
    },
    resolve: async (parent, args) => {
        const { error } = person.RegisterSchema.validate(args);
        if (error) return error;

        const username = removeTags(args.username);

        const checkRegister = await personModel.findOne({ _id: username });
        if (checkRegister) return { error: "user registered..." };

        const hashedPassword = hasher(
            "md5",
            removeTags(args.password),
            "utf-8",
            "hex",
        );

        const newPerson = new personModel({
            _id: username,// _id is person username
            password: hashedPassword
        });

        const result = await newPerson.save();

        return result;

    }
};

export const updatePerson = {
    type: Person,
    args: {
        token: { type: GraphQLString },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        age: { type: GraphQLInt },
        description: { type: GraphQLString },
    },
    resolve: async (parent, args) => {
        const { error } = person.UpdateSchema.validate(args);
        if (error) return { error: error };

        const validateResult: any = auth(args.token, secret);
        if (validateResult.error) return { error: validateResult.error };

        delete args.token;

        const result = await personModel.updateOne(args);

        return result;

    }
};

export const deleteAccount = {
    type: Result,
    args: {
        token: { type: GraphQLString }
    },
    resolve: async (parent, args) => {
        const { error } = person.deleteAccountSchema.validate(args);
        if (error) return { error };

        const validateResult: any = auth(args.token, secret);
        if (validateResult.error) return { error: validateResult.error };

        await postModel.deleteMany({ ownerUsername: validateResult.username });
        const result = await personModel.deleteOne({ _id: validateResult.username });

        return { result: `delete count : ${result.deletedCount}` };

    }
}