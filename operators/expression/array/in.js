"use strict";
// Array Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#array-expression-operators
Object.defineProperty(exports, "__esModule", { value: true });
exports.$in = void 0;
const util_1 = require("../../../util");
const core_1 = require("../../../core");
/**
 * Returns a boolean indicating whether a specified value is in an array.
 *
 * @param {Object} obj
 * @param {Array} expr
 */
function $in(obj, expr, options) {
    let args = core_1.computeValue(obj, expr, null, options);
    let item = args[0];
    let arr = args[1];
    util_1.assert(util_1.isArray(arr), '$in second argument must be an array');
    return arr.some(util_1.isEqual.bind(null, item));
}
exports.$in = $in;
