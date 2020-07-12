"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$min = void 0;
const push_1 = require("./push");
/**
 * Returns the lowest value in a group.
 *
 * @param {Array} collection The input array
 * @param {Object} expr The right-hand side expression value of the operator
 * @param {Options} The options to use for this operator
 * @returns {*}
 */
function $min(collection, expr, options) {
    let nums = push_1.$push(collection, expr, options);
    let n = nums.reduce((acc, n) => n < acc ? n : acc, Infinity);
    return n === Infinity ? undefined : n;
}
exports.$min = $min;
