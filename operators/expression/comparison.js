"use strict";
// Comparison Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#comparison-expression-operators
Object.defineProperty(exports, "__esModule", { value: true });
exports.$cmp = exports.$ne = exports.$lte = exports.$lt = exports.$gte = exports.$gt = exports.$eq = void 0;
const core_1 = require("../../core");
const _predicates_1 = require("../_predicates");
exports.$eq = _predicates_1.createExpressionOperator(_predicates_1.$eq);
exports.$gt = _predicates_1.createExpressionOperator(_predicates_1.$gt);
exports.$gte = _predicates_1.createExpressionOperator(_predicates_1.$gte);
exports.$lt = _predicates_1.createExpressionOperator(_predicates_1.$lt);
exports.$lte = _predicates_1.createExpressionOperator(_predicates_1.$lte);
exports.$ne = _predicates_1.createExpressionOperator(_predicates_1.$ne);
/**
 * Compares two values and returns the result of the comparison as an integer.
 *
 * @param obj
 * @param expr
 * @returns {number}
 */
function $cmp(obj, expr, options) {
    let args = core_1.computeValue(obj, expr, null, options);
    if (args[0] > args[1])
        return 1;
    if (args[0] < args[1])
        return -1;
    return 0;
}
exports.$cmp = $cmp;
