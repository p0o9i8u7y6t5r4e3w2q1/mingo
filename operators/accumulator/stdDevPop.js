"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$stdDevPop = void 0;
const util_1 = require("../../util");
const push_1 = require("./push");
const _internal_1 = require("./_internal");
/**
 * Returns the population standard deviation of the input values.
 *
 * @param {Array} collection The input array
 * @param {Object} expr The right-hand side expression value of the operator
 * @param {Options} options The options to use for this operation
 * @return {Number}
 */
function $stdDevPop(collection, expr, options) {
    return _internal_1.stddev(push_1.$push(collection, expr, options).filter(util_1.isNumber), false);
}
exports.$stdDevPop = $stdDevPop;
