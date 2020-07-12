"use strict";
/**
 * String Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#string-expression-operators
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.$substr = void 0;
const util_1 = require("../../../util");
const core_1 = require("../../../core");
/**
 * Returns a substring of a string, starting at a specified index position and including the specified number of characters.
 * The index is zero-based.
 *
 * @param obj
 * @param expr
 * @returns {string}
 */
function $substr(obj, expr, options) {
    let args = core_1.computeValue(obj, expr, null, options);
    let s = args[0];
    let index = args[1];
    let count = args[2];
    if (util_1.isString(s)) {
        if (index < 0) {
            return '';
        }
        else if (count < 0) {
            return s.substr(index);
        }
        else {
            return s.substr(index, count);
        }
    }
    return '';
}
exports.$substr = $substr;
