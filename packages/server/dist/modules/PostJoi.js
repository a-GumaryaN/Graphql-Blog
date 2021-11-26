"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.post = void 0;
var joi = require("joi");
exports.post = {
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
