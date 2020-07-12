"use strict";
// Arithmetic Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#arithmetic-expression-operators
Object.defineProperty(exports, "__esModule", { value: true });
exports.$exp = void 0;
const util_1 = require("../../../util");
const core_1 = require("../../../core");
/**
 * Raises Euler’s number (i.e. e ) to the specified exponent and returns the result.
 *
 * @param obj
 * @param expr
 * @returns {number}
 */
function $exp(obj, expr, options) {
    let arg = core_1.computeValue(obj, expr, null, options);
    if (util_1.isNil(arg))
        return null;
    util_1.assert(util_1.isNumber(arg) || isNaN(arg), '$exp expression must resolve to a number.');
    return Math.exp(arg);
}
exports.$exp = $exp;
