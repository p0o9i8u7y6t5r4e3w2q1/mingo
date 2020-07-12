"use strict";
/**
 * Variable Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#variable-expression-operators
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.$let = void 0;
const core_1 = require("../../../core");
const util_1 = require("../../../util");
/**
 * Defines variables for use within the scope of a sub-expression and returns the result of the sub-expression.
 *
 * @param obj The target object for this expression
 * @param expr The right-hand side of the operator
 * @param options Options to use for this operattion
 * @returns {*}
 */
function $let(obj, expr, options) {
    let varsExpr = expr.vars;
    let inExpr = expr.in;
    // resolve vars
    util_1.each(varsExpr, (val, key) => {
        let newExpr = core_1.computeValue(obj, val, null, options);
        let tempKey = '$' + key;
        obj[tempKey] = newExpr;
    });
    return core_1.computeValue(obj, inExpr, null, options);
}
exports.$let = $let;
