"use strict";
/**
 * Set Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#set-expression-operators
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.$setIntersection = void 0;
const util_1 = require("../../../util");
const core_1 = require("../../../core");
/**
 * Returns the common elements of the input sets.
 * @param obj
 * @param expr
 */
function $setIntersection(obj, expr, options) {
    let args = core_1.computeValue(obj, expr, null, options);
    return util_1.intersection(args[0], args[1]);
}
exports.$setIntersection = $setIntersection;
