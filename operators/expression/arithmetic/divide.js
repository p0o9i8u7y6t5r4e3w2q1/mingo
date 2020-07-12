"use strict";
// Arithmetic Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#arithmetic-expression-operators
Object.defineProperty(exports, "__esModule", { value: true });
exports.$divide = void 0;
const core_1 = require("../../../core");
/**
 * Takes two numbers and divides the first number by the second.
 *
 * @param obj
 * @param expr
 * @returns {number}
 */
function $divide(obj, expr, options) {
    let args = core_1.computeValue(obj, expr, null, options);
    return args[0] / args[1];
}
exports.$divide = $divide;