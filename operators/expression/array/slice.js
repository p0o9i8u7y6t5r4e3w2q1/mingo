"use strict";
// Array Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#array-expression-operators
Object.defineProperty(exports, "__esModule", { value: true });
exports.$slice = void 0;
const core_1 = require("../../../core");
const util_1 = require("../../../util");
/**
 * Returns a subset of an array.
 *
 * @param  {Object} obj
 * @param  {*} expr
 * @return {*}
 */
function $slice(obj, expr, options) {
    let args = core_1.computeValue(obj, expr, null, options);
    let [arr, skip, limit] = args;
    // MongoDB $slice works a bit differently from Array.slice
    // Uses single argument for 'limit' and array argument [skip, limit]
    if (util_1.isNil(limit)) {
        if (skip < 0) {
            skip = Math.max(0, arr.length + skip);
            limit = arr.length - skip + 1;
        }
        else {
            limit = skip;
            skip = 0;
        }
    }
    else {
        if (skip < 0) {
            skip = Math.max(0, arr.length + skip);
        }
        util_1.assert(limit > 0, 'Invalid argument value for $slice operator. Limit must be a positive number');
        limit += skip;
    }
    return arr.slice(skip, limit);
}
exports.$slice = $slice;
