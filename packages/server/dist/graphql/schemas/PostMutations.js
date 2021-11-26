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
exports.deletePost = exports.updatePost = exports.addPost = void 0;
var auth_1 = require("../../modules/auth");
var XSS_1 = require("../../modules/XSS");
var graphql_1 = require("graphql");
var dbSchemas_1 = require("../../db/dbSchemas");
var PostSchema_1 = require("./PostSchema");
var dependensies_1 = require("./dependensies");
var PostJoi_1 = require("../../modules/PostJoi");
exports.addPost = {
    type: PostSchema_1.Post,
    args: {
        token: { type: graphql_1.GraphQLString },
        title: { type: graphql_1.GraphQLString },
        content: { type: graphql_1.GraphQLString }
    },
    resolve: function (parent, args) { return __awaiter(void 0, void 0, void 0, function () {
        var error, authResult, ownerUsername, content, title, newPost, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    error = PostJoi_1.post.addSchema.validate(args).error;
                    if (error)
                        return [2 /*return*/, { error: error }];
                    authResult = (0, auth_1.auth)(args.token, dependensies_1.secret);
                    if (authResult.error)
                        return [2 /*return*/, { error: authResult.error }];
                    ownerUsername = authResult.username, content = (0, XSS_1.removeTags)(args.content), title = (0, XSS_1.removeTags)(args.title);
                    newPost = new dbSchemas_1.postModel({
                        ownerUsername: ownerUsername,
                        content: content,
                        title: title
                    });
                    return [4 /*yield*/, newPost.save()];
                case 1:
                    result = _a.sent();
                    if (!result)
                        return [2 /*return*/, { error: "error in saving..." }];
                    return [2 /*return*/, result];
            }
        });
    }); }
};
exports.updatePost = {
    type: PostSchema_1.Post,
    args: {
        token: { type: graphql_1.GraphQLString },
        title: { type: graphql_1.GraphQLString },
        content: { type: graphql_1.GraphQLString },
        link: { type: graphql_1.GraphQLString },
        averageLikes: { type: graphql_1.GraphQLInt }
    },
    resolve: function (parent, args) { return __awaiter(void 0, void 0, void 0, function () {
        var error, authResult, result, Return;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    error = PostJoi_1.post.UpdateSchema.validate(args).error;
                    if (error)
                        return [2 /*return*/, { error: error }];
                    authResult = (0, auth_1.auth)(args.token, dependensies_1.secret);
                    if (authResult.error)
                        return [2 /*return*/, { error: authResult.error }];
                    delete args.token;
                    return [4 /*yield*/, dbSchemas_1.postModel.updateOne({
                            ownerUsername: authResult.username
                        }, args)];
                case 1:
                    result = _a.sent();
                    return [4 /*yield*/, dbSchemas_1.postModel.findOne({
                            ownerUsername: authResult.username
                        })];
                case 2:
                    Return = _a.sent();
                    return [2 /*return*/, Return];
            }
        });
    }); }
};
exports.deletePost = {
    type: dependensies_1.Result,
    args: {
        token: { type: graphql_1.GraphQLString },
        title: { type: graphql_1.GraphQLString }
    },
    resolve: function (parent, args) { return __awaiter(void 0, void 0, void 0, function () {
        var error, authResult, findResult, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    error = PostJoi_1.post.DeleteSchema.validate(args).error;
                    if (error)
                        return [2 /*return*/, { error: error }];
                    authResult = (0, auth_1.auth)(args.token, dependensies_1.secret);
                    if (authResult.error)
                        return [2 /*return*/, { error: authResult.error }];
                    return [4 /*yield*/, dbSchemas_1.postModel.findOne({
                            ownerUsername: authResult.username,
                            title: args.title
                        })];
                case 1:
                    findResult = _a.sent();
                    if (!findResult)
                        return [2 /*return*/, { error: "post not found..." }];
                    return [4 /*yield*/, dbSchemas_1.postModel.deleteMany({
                            ownerUsername: authResult.username,
                            title: args.title
                        })];
                case 2:
                    result = _a.sent();
                    return [2 /*return*/, { result: "delete count : " + result.deletedCount }];
            }
        });
    }); }
};
