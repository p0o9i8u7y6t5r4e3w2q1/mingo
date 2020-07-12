"use strict";
/**
 * Set Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#set-expression-operators
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.$setEquals = void 0;
const util_1 = require("../../../util");
const core_1 = require("../../../core");
/**
 * Returns true if two sets have the same elements.
 * @param obj
 * @param expr
 */
function $setEquals(obj, expr, options) {
    let args = core_1.computeValue(obj, expr, null, options);
    let xs = util_1.unique(args[0]);
    let ys = util_1.unique(args[1]);
    return xs.length === ys.length && xs.length === util_1.intersection(xs, ys).length;
}
exports.$setEquals = $setEquals;
