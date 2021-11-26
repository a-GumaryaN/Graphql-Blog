import * as joi from "joi";

export const person = {
    RegisterSchema: joi.object({
        username: joi.string()
            .required(),
        password: joi.string()
            .required()
    }),
    deleteAccountSchema: joi.object({
        token: joi.string()
            .required()
    }),
    UpdateSchema: joi.object({
        token: joi.string().required(),
        firstName: joi.string(),
        lastName: joi.string(),
        age: joi.number(),
        description: joi.string(),
        password: joi.string()
    })
}