"use strict";
// Arithmetic Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#arithmetic-expression-operators
Object.defineProperty(exports, "__esModule", { value: true });
exports.$ceil = void 0;
const util_1 = require("../../../util");
const core_1 = require("../../../core");
/**
 * Returns the smallest integer greater than or equal to the specified number.
 *
 * @param obj
 * @param expr
 * @returns {number}
 */
function $ceil(obj, expr, options) {
    let arg = core_1.computeValue(obj, expr, null, options);
    if (util_1.isNil(arg))
        return null;
    util_1.assert(util_1.isNumber(arg) || isNaN(arg), '$ceil expression must resolve to a number.');
    return Math.ceil(arg);
}
exports.$ceil = $ceil;
