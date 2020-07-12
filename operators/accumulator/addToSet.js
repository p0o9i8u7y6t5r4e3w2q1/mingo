"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$addToSet = void 0;
const util_1 = require("../../util");
const push_1 = require("./push");
/**
 * Returns an array of all the unique values for the selected field among for each document in that group.
 *
 * @param {Array} collection The input array
 * @param {Object} expr The right-hand side expression value of the operator
 * @param {Options} options The options to use for this operation
 * @returns {*}
 */
function $addToSet(collection, expr, options) {
    return util_1.unique(push_1.$push(collection, expr, options));
}
exports.$addToSet = $addToSet;
