import * as joi from "joi";

export const post = {
    addSchema: joi.object({
        token: joi.string()
            .required(),
        title: joi.string()
            .required(),
        content: joi.string()
            .required(),
        link: joi.string(),
        averageLikes: joi.number()
    }),
    UpdateSchema: joi.object({
        token: joi.string().required(),
        title: joi.string(),
        content: joi.string(),
        link: joi.string(),
        averageLikes: joi.number()
    }),
    DeleteSchema: joi.object({
        token: joi.string().required(),
        title: joi.string().required()
    })
};