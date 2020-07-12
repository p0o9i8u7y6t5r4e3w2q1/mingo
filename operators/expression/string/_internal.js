"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.regexSearch = exports.trimString = void 0;
const util_1 = require("../../../util");
const core_1 = require("../../../core");
const WHITESPACE_CHARS = [
    0x0000,
    0x0020,
    0x0009,
    0x000A,
    0x000B,
    0x000C,
    0x000D,
    0x00A0,
    0x1680,
    0x2000,
    0x2001,
    0x2002,
    0x2003,
    0x2004,
    0x2005,
    0x2006,
    0x2007,
    0x2008,
    0x2009,
    0x200A // Hair space
];
/**
 * Trims the resolved string
 *
 * @param obj
 * @param expr
 * @param options
 */
function trimString(obj, expr, options, trimOpts) {
    let val = core_1.computeValue(obj, expr, null, options);
    let s = val.input;
    if (util_1.isNil(s))
        return null;
    let codepoints = util_1.isNil(val.chars) ? WHITESPACE_CHARS : val.chars.split('').map((c) => c.codePointAt(0));
    let i = 0;
    let j = s.length - 1;
    while (trimOpts.left && i <= j && codepoints.indexOf(s[i].codePointAt(0)) !== -1)
        i++;
    while (trimOpts.right && i <= j && codepoints.indexOf(s[j].codePointAt(0)) !== -1)
        j--;
    return s.substring(i, j + 1);
}
exports.trimString = trimString;
/**
 * Performs a regex search
 *
 * @param obj
 * @param expr
 * @param opts
 */
function regexSearch(obj, expr, options, reOpts) {
    let val = core_1.computeValue(obj, expr, null, options);
    if (!util_1.isString(val.input))
        return [];
    if (val.options) {
        util_1.assert(val.options.indexOf('x') === -1, "extended capability option 'x' not supported");
        util_1.assert(val.options.indexOf('g') === -1, "global option 'g' not supported");
    }
    let input = val.input;
    let re = new RegExp(val.regex, val.options);
    let m = null;
    let matches = [];
    let offset = 0;
    while (m = input.match(re)) {
        let result = { match: m[0], idx: m.index + offset, captures: [] };
        for (let i = 1; i < m.length; i++) {
            result.captures.push(m[i] || null);
        }
        matches.push(result);
        if (!reOpts.global)
            break;
        offset = m.index + m[0].length;
        input = input.substr(offset);
    }
    return matches;
}
exports.regexSearch = regexSearch;
