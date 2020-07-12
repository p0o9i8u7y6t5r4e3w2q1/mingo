"use strict";
// $slice operator. https://docs.mongodb.com/manual/reference/operator/projection/slice/#proj._S_slice
Object.defineProperty(exports, "__esModule", { value: true });
exports.$slice = void 0;
const util_1 = require("../../util");
const array_1 = require("../expression/array");
/**
 * Limits the number of elements projected from an array. Supports skip and limit slices.
 *
 * @param obj
 * @param field
 * @param expr
 */
function $slice(obj, expr, field, options) {
    let xs = util_1.resolve(obj, field);
    if (!util_1.isArray(xs))
        return xs;
    return array_1.$slice(obj, util_1.isArray(expr) ? [xs, ...expr] : [xs, expr], options);
}
exports.$slice = $slice;
