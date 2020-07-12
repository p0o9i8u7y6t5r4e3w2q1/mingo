"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$sum = void 0;
const util_1 = require("../../util");
const push_1 = require("./push");
/**
 * Returns the sum of all the values in a group.
 *
 * @param {Array} collection The input array
 * @param {Object} expr The right-hand side expression value of the operator
 * @returns {Number}
 */
function $sum(collection, expr, options) {
    if (!util_1.isArray(collection))
        return 0;
    // take a short cut if expr is number literal
    if (util_1.isNumber(expr))
        return collection.length * expr;
    let nums = push_1.$push(collection, expr, options).filter(util_1.isNumber);
    return nums.reduce((acc, n) => acc + n, 0);
}
exports.$sum = $sum;
