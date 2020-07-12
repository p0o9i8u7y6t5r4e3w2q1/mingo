"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$max = void 0;
const push_1 = require("./push");
/**
 * Returns the highest value in a group.
 *
 * @param {Array} collection The input array
 * @param {Object} expr The right-hand side expression value of the operator
 * @param {Options} options The options to use for this operation
 * @returns {*}
 */
function $max(collection, expr, options) {
    let nums = push_1.$push(collection, expr, options);
    let n = nums.reduce((acc, n) => n > acc ? n : acc, -Infinity);
    return n === -Infinity ? undefined : n;
}
exports.$max = $max;
