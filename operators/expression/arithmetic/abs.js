"use strict";
// Arithmetic Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#arithmetic-expression-operators
Object.defineProperty(exports, "__esModule", { value: true });
exports.$abs = void 0;
const core_1 = require("../../../core");
const util_1 = require("../../../util");
/**
 * Returns the absolute value of a number.
 *
 * @param obj
 * @param expr
 * @return {Number|null|NaN}
 */
function $abs(obj, expr, options) {
    let val = core_1.computeValue(obj, expr, null, options);
    return util_1.isNil(val) ? null : Math.abs(val);
}
exports.$abs = $abs;
