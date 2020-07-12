"use strict";
// $elemMatch operator. https://docs.mongodb.com/manual/reference/operator/projection/elemMatch/#proj._S_elemMatch
Object.defineProperty(exports, "__esModule", { value: true });
exports.$elemMatch = void 0;
const util_1 = require("../../util");
const query_1 = require("../../query");
/**
 * Projects only the first element from an array that matches the specified $elemMatch condition.
 *
 * @param obj
 * @param field
 * @param expr
 * @returns {*}
 */
function $elemMatch(obj, expr, field, options) {
    let arr = util_1.resolve(obj, field);
    let query = new query_1.Query(expr, options.config);
    util_1.assert(util_1.isArray(arr), '$elemMatch: argument must resolve to array');
    for (let i = 0; i < arr.length; i++) {
        if (query.test(arr[i]))
            return [arr[i]];
    }
    return undefined;
}
exports.$elemMatch = $elemMatch;
