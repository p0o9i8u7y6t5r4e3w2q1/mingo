"use strict";
/**
 * Conditional Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#conditional-expression-operators
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.$ifNull = void 0;
const util_1 = require("../../../util");
const core_1 = require("../../../core");
/**
 * Evaluates an expression and returns the first expression if it evaluates to a non-null value.
 * Otherwise, $ifNull returns the second expression's value.
 *
 * @param obj
 * @param expr
 * @returns {*}
 */
function $ifNull(obj, expr, options) {
    util_1.assert(util_1.isArray(expr) && expr.length === 2, '$ifNull expression must resolve to array(2)');
    let args = core_1.computeValue(obj, expr, null, options);
    return util_1.isNil(args[0]) ? args[1] : args[0];
}
exports.$ifNull = $ifNull;
