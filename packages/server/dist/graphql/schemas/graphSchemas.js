"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mutation = void 0;
var joi = require("joi");
var modules_1 = require("../../modules/modules");
var XSS_1 = require("../../modules/XSS");
var PersonRegisterSchema = joi.object({
    username: joi.string()
        .required(),
    password: joi.string()
        .required()
});
var PostSchema = joi.object({
    ownerUsername: joi.string()
        .required(),
    title: joi.string()
        .required(),
    content: joi.string()
        .required(),
    link: joi.string(),
    averageLikes: joi.string()
});
var graphql_1 = require("graphql");
var dbSchemas_1 = require("../../db/dbSchemas");
var Comment = new graphql_1.GraphQLObjectType({
    name: "Comment",
    fields: {
        name: { type: graphql_1.GraphQLString },
        email: { type: graphql_1.GraphQLString },
        content: { type: graphql_1.GraphQLString },
    }
});
var Post = new graphql_1.GraphQLObjectType({
    name: "Post",
    fields: function () { return ({
        title: { type: graphql_1.GraphQLString },
        content: { type: graphql_1.GraphQLString },
        link: { type: graphql_1.GraphQLString },
        ownerUsername: { type: graphql_1.GraphQLString },
        owner: {
            type: Person,
            resolve: function (parent) { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, dbSchemas_1.personModel.findOne({ _id: parent.ownerUsername })];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            }); }
        },
        averageLikes: { type: graphql_1.GraphQLInt },
    }); }
});
var Person = new graphql_1.GraphQLObjectType({
    name: "Person",
    fields: function () { return ({
        username: { type: graphql_1.GraphQLID },
        password: { type: graphql_1.GraphQLString },
        firstName: { type: graphql_1.GraphQLString },
        lastName: { type: graphql_1.GraphQLString },
        age: { type: graphql_1.GraphQLInt },
        posts: {
            type: (0, graphql_1.GraphQLList)(Post),
            resolve: function (parent, args) { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, dbSchemas_1.postModel.find({ owner: parent._id })];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            }); }
        },
        description: { type: graphql_1.GraphQLString }
    }); }
});
var Query = new graphql_1.GraphQLObjectType({
    name: "Query",
    fields: {
        getPerson: {
            type: Person,
            args: {
                firstName: { type: graphql_1.GraphQLString },
                lastName: { type: graphql_1.GraphQLString },
                username: { type: graphql_1.GraphQLString }
            },
            resolve: function (parent, args) { return __awaiter(void 0, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, dbSchemas_1.personModel.findOne(args)];
                        case 1:
                            result = _a.sent();
                            console.log(args);
                            return [2 /*return*/, result];
                    }
                });
            }); }
        },
        getPost: {
            type: Post,
            args: {
                ownerUsername: { type: graphql_1.GraphQLString },
                title: { type: graphql_1.GraphQLString }
            },
            resolve: function (parent, args) { return __awaiter(void 0, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, dbSchemas_1.postModel.findOne({ ownerUsername: args.ownerUsername })];
                        case 1:
                            result = _a.sent();
                            console.log(result);
                            return [2 /*return*/, result];
                    }
                });
            }); }
        },
    }
});
exports.Mutation = new graphql_1.GraphQLObjectType({
    name: "Mutation",
    fields: {
        addPerson: {
            type: Person,
            args: {
                username: { type: graphql_1.GraphQLString },
                password: { type: graphql_1.GraphQLString }
            },
            resolve: function (parent, args) { return __awaiter(void 0, void 0, void 0, function () {
                var error, username, hashedPassword, newPerson;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            error = PersonRegisterSchema.validate(args).error;
                            if (error)
                                return [2 /*return*/, error];
                            username = (0, XSS_1.removeTags)(args.username), hashedPassword = (0, modules_1.hasher)("md5", (0, XSS_1.removeTags)(args.password), "utf-8", "hex");
                            newPerson = new dbSchemas_1.personModel({
                                _id: username,
                                password: hashedPassword
                            });
                            return [4 /*yield*/, newPerson.save()];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            }); }
        },
        addPost: {
            type: Post,
            args: {
                title: { type: graphql_1.GraphQLString },
                content: { type: graphql_1.GraphQLString },
                ownerUsername: { type: graphql_1.GraphQLString }
            },
            resolve: function (parent, args) { return __awaiter(void 0, void 0, void 0, function () {
                var error, ownerUsername, content, title, newPost;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            error = PostSchema.validate(args).error;
                            if (error)
                                return [2 /*return*/, error];
                            ownerUsername = (0, XSS_1.removeTags)(args.ownerUsername), content = (0, XSS_1.removeTags)(args.content), title = (0, XSS_1.removeTags)(args.title);
                            newPost = new dbSchemas_1.postModel({
                                _id: title,
                                ownerUsername: ownerUsername,
                                content: content
                            });
                            return [4 /*yield*/, newPost.save()];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            }); }
        },
    }
});
