"use strict";
/**
 * String Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#string-expression-operators
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.$substrBytes = void 0;
const util_1 = require("../../../util");
const core_1 = require("../../../core");
const UTF8_MASK = [0xC0, 0xE0, 0xF0];
// encodes a unicode code point to a utf8 byte sequence
// https://encoding.spec.whatwg.org/#utf-8
function toUtf8(n) {
    if (n < 0x80)
        return [n];
    let count = ((n < 0x0800) && 1) || ((n < 0x10000) && 2) || 3;
    const offset = UTF8_MASK[count - 1];
    let utf8 = [(n >> (6 * count)) + offset];
    while (count > 0)
        utf8.push(0x80 | ((n >> (6 * --count)) & 0x3F));
    return utf8;
}
function utf8Encode(s) {
    let buf = [];
    for (let i = 0, len = s.length; i < len; i++) {
        buf.push(toUtf8(s.codePointAt(i)));
    }
    return buf;
}
/**
 * Returns a substring of a string, starting at a specified index position and including the specified number of characters.
 * The index is zero-based.
 *
 * @param obj
 * @param expr
 * @returns {string}
 */
function $substrBytes(obj, expr, options) {
    let args = core_1.computeValue(obj, expr, null, options);
    let s = args[0];
    let index = args[1];
    let count = args[2];
    util_1.assert(util_1.isString(s) && util_1.isNumber(index) && index >= 0 && util_1.isNumber(count) && count >= 0, '$substrBytes: invalid arguments');
    let buf = utf8Encode(s);
    let validIndex = [];
    let acc = 0;
    for (let i = 0; i < buf.length; i++) {
        validIndex.push(acc);
        acc += buf[i].length;
    }
    let begin = validIndex.indexOf(index);
    let end = validIndex.indexOf(index + count);
    util_1.assert(begin > -1 && end > -1, '$substrBytes: invalid range, start or end index is a UTF-8 continuation byte.');
    return s.substring(begin, end);
}
exports.$substrBytes = $substrBytes;
