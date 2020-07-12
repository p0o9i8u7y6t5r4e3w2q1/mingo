"use strict";
// Arithmetic Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#arithmetic-expression-operators
Object.defineProperty(exports, "__esModule", { value: true });
exports.$log10 = void 0;
const util_1 = require("../../../util");
const core_1 = require("../../../core");
/**
 * Calculates the log base 10 of a number and returns the result as a double.
 *
 * @param obj
 * @param expr
 * @returns {number}
 */
function $log10(obj, expr, options) {
    let arg = core_1.computeValue(obj, expr, null, options);
    if (util_1.isNil(arg))
        return null;
    util_1.assert(util_1.isNumber(arg) || isNaN(arg), '$log10 expression must resolve to a number.');
    return Math.log10(arg);
}
exports.$log10 = $log10;
