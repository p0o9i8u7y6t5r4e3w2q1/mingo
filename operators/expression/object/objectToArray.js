"use strict";
// Object Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#object-expression-operators
Object.defineProperty(exports, "__esModule", { value: true });
exports.$objectToArray = void 0;
const util_1 = require("../../../util");
const core_1 = require("../../../core");
/**
 * Converts a document to an array of documents representing key-value pairs.
 *
 * @param {*} obj The target object for this expression
 * @param {*} expr The right-hand side of the operator
 * @param {Options} options Options to use for operation
 */
function $objectToArray(obj, expr, options) {
    let val = core_1.computeValue(obj, expr, null, options);
    util_1.assert(util_1.isObject(val), '$objectToArray expression must resolve to an object');
    let arr = [];
    util_1.each(val, (v, k) => arr.push({ k, v }));
    return arr;
}
exports.$objectToArray = $objectToArray;
