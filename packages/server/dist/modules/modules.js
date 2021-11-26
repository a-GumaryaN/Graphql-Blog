"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasher = void 0;
var crypto = require('crypto');
var hasher = function (algo, input, charStandard, hashFormat) {
    var hash = crypto.createHash(algo);
    hash.update(input, charStandard);
    return hash.digest(hashFormat);
};
exports.hasher = hasher;
