"use strict";
// Array Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#array-expression-operators
Object.defineProperty(exports, "__esModule", { value: true });
exports.$range = void 0;
const core_1 = require("../../../core");
/**
 * Returns an array whose elements are a generated sequence of numbers.
 *
 * @param  {Object} obj
 * @param  {*} expr
 * @return {*}
 */
function $range(obj, expr, options) {
    let arr = core_1.computeValue(obj, expr, null, options);
    let start = arr[0];
    let end = arr[1];
    let step = arr[2] || 1;
    let result = [];
    while ((start < end && step > 0) || (start > end && step < 0)) {
        result.push(start);
        start += step;
    }
    return result;
}
exports.$range = $range;
