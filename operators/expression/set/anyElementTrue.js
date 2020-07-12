"use strict";
/**
 * Set Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#set-expression-operators
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.$anyElementTrue = void 0;
const util_1 = require("../../../util");
const core_1 = require("../../../core");
/**
 * Returns true if any elements of a set evaluate to true, and false otherwise.
 * @param obj
 * @param expr
 */
function $anyElementTrue(obj, expr, options) {
    // mongodb nests the array expression in another
    let args = core_1.computeValue(obj, expr, null, options)[0];
    return args.some(util_1.truthy);
}
exports.$anyElementTrue = $anyElementTrue;
