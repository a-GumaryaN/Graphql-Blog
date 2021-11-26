"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
var jwt = require("jsonwebtoken");
var auth = function (token, secretKey) {
    if (!token)
        return { error: 'access denied...' };
    try {
        // const nowDate = new Date().getTime();
        var exp = jwt.decode(token).exp;
        if (Date.now() > exp * 1000)
            return { error: 'token is expired...' };
        var userVerified = jwt.verify(token, secretKey);
        var decodedToken = jwt.decode(token);
        if (userVerified)
            return { username: decodedToken.username };
        return { error: 'invalid token...' };
    }
    catch (err) {
        return { error: 'invalid token...' };
    }
};
exports.auth = auth;
