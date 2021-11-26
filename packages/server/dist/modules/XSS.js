"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeTags = void 0;
var tagBody = '(?:[^"\'>]|"[^"]*"|\'[^\']*\')*';
var tagOrComment = new RegExp('<(?:'
    // Comment body.
    +
        '!--(?:(?:-*[^->])*--+|-?)'
    // Special "raw text" elements whose content should be elided.
    +
        '|script\\b' + tagBody + '>[\\s\\S]*?</script\\s*' +
    '|style\\b' + tagBody + '>[\\s\\S]*?</style\\s*'
    // Regular name
    +
        '|/?[a-z]' +
    tagBody +
    ')>', 'gi');
var removeTags = function (input) {
    var oldinput;
    do {
        oldinput = input;
        input = input.replace(tagOrComment, '');
    } while (input !== oldinput);
    return input.replace(/</g, '&lt;');
};
exports.removeTags = removeTags;
