"use strict";
// Array Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#array-expression-operators
Object.defineProperty(exports, "__esModule", { value: true });
exports.$arrayElemAt = void 0;
const core_1 = require("../../../core");
const util_1 = require("../../../util");
/**
 * Returns the element at the specified array index.
 *
 * @param  {Object} obj
 * @param  {*} expr
 * @return {*}
 */
function $arrayElemAt(obj, expr, options) {
    let args = core_1.computeValue(obj, expr, null, options);
    util_1.assert(util_1.isArray(args) && args.length === 2, '$arrayElemAt expression must resolve to array(2)');
    if (args.some(util_1.isNil))
        return null;
    let index = args[1];
    let arr = args[0];
    if (index < 0 && Math.abs(index) <= arr.length) {
        return arr[(index + arr.length) % arr.length];
    }
    else if (index >= 0 && index < arr.length) {
        return arr[index];
    }
    return undefined;
}
exports.$arrayElemAt = $arrayElemAt;
