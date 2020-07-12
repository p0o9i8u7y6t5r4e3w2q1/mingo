"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$push = void 0;
const util_1 = require("../../util");
const core_1 = require("../../core");
/**
 * Returns an array of all values for the selected field among for each document in that group.
 *
 * @param {Array} collection The input array
 * @param {Object} expr The right-hand side expression value of the operator
 * @param {Options} options The options to use for this operation
 * @returns {Array|*}
 */
function $push(collection, expr, options) {
    if (util_1.isNil(expr))
        return collection;
    return collection.map(obj => core_1.computeValue(obj, expr, null, options));
}
exports.$push = $push;
