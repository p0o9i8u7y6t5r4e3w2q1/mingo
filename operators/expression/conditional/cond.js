"use strict";
/**
 * Conditional Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#conditional-expression-operators
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.$cond = void 0;
const util_1 = require("../../../util");
const core_1 = require("../../../core");
/**
 * A ternary operator that evaluates one expression,
 * and depending on the result returns the value of one following expressions.
 *
 * @param obj
 * @param expr
 */
function $cond(obj, expr, options) {
    let ifExpr;
    let thenExpr;
    let elseExpr;
    const errorMsg = '$cond: invalid arguments';
    if (util_1.isArray(expr)) {
        util_1.assert(expr.length === 3, errorMsg);
        ifExpr = expr[0];
        thenExpr = expr[1];
        elseExpr = expr[2];
    }
    else {
        util_1.assert(util_1.isObject(expr), errorMsg);
        ifExpr = expr.if;
        thenExpr = expr.then;
        elseExpr = expr.else;
    }
    let condition = core_1.computeValue(obj, ifExpr, null, options);
    return core_1.computeValue(obj, condition ? thenExpr : elseExpr, null, options);
}
exports.$cond = $cond;
