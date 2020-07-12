"use strict";
// Array Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#array-expression-operators
Object.defineProperty(exports, "__esModule", { value: true });
exports.$concatArrays = void 0;
const util_1 = require("../../../util");
const core_1 = require("../../../core");
/**
 * Concatenates arrays to return the concatenated array.
 *
 * @param  {Object} obj
 * @param  {*} expr
 * @return {*}
 */
function $concatArrays(obj, expr, options) {
    let arr = core_1.computeValue(obj, expr, null, options);
    util_1.assert(util_1.isArray(arr), '$concatArrays must resolve to an array');
    if (arr.some(util_1.isNil))
        return null;
    return arr.reduce((acc, item) => util_1.into(acc, item), []);
}
exports.$concatArrays = $concatArrays;
