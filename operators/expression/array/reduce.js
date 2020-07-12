"use strict";
// Array Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#array-expression-operators
Object.defineProperty(exports, "__esModule", { value: true });
exports.$reduce = void 0;
const core_1 = require("../../../core");
const util_1 = require("../../../util");
/**
 * Applies an expression to each element in an array and combines them into a single value.
 *
 * @param {Object} obj
 * @param {*} expr
 */
function $reduce(obj, expr, options) {
    let input = core_1.computeValue(obj, expr.input, null, options);
    let initialValue = core_1.computeValue(obj, expr.initialValue, null, options);
    let inExpr = expr['in'];
    if (util_1.isNil(input))
        return null;
    util_1.assert(util_1.isArray(input), "$reduce 'input' expression must resolve to an array");
    return input.reduce((acc, n) => core_1.computeValue({ '$value': acc, '$this': n }, inExpr, null, options), initialValue);
}
exports.$reduce = $reduce;
