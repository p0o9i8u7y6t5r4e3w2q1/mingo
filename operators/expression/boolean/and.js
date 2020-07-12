"use strict";
// Boolean Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#boolean-expression-operators
Object.defineProperty(exports, "__esModule", { value: true });
exports.$and = void 0;
const core_1 = require("../../../core");
const util_1 = require("../../../util");
/**
 * Returns true only when all its expressions evaluate to true. Accepts any number of argument expressions.
 *
 * @param obj
 * @param expr
 * @returns {boolean}
 */
function $and(obj, expr, options) {
    let value = core_1.computeValue(obj, expr, null, options);
    return util_1.truthy(value) && value.every(util_1.truthy);
}
exports.$and = $and;
