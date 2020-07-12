"use strict";
// Boolean Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#boolean-expression-operators
Object.defineProperty(exports, "__esModule", { value: true });
exports.$not = void 0;
const core_1 = require("../../../core");
/**
 * Returns the boolean value that is the opposite of its argument expression. Accepts a single argument expression.
 *
 * @param obj
 * @param expr
 * @returns {boolean}
 */
function $not(obj, expr, options) {
    return !core_1.computeValue(obj, expr[0], null, options);
}
exports.$not = $not;
