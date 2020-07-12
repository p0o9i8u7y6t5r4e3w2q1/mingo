"use strict";
// Query Logical Operators: https://docs.mongodb.com/manual/reference/operator/query-logical/
Object.defineProperty(exports, "__esModule", { value: true });
exports.$or = void 0;
const util_1 = require("../../../util");
const query_1 = require("../../../query");
/**
 * Joins query clauses with a logical OR returns all documents that match the conditions of either clause.
 *
 * @param selector
 * @param value
 * @returns {Function}
 */
function $or(selector, value, options) {
    util_1.assert(util_1.isArray(value), 'Invalid expression. $or expects value to be an Array');
    let queries = value.map(expr => new query_1.Query(expr, options.config));
    return obj => {
        for (let i = 0; i < queries.length; i++) {
            if (queries[i].test(obj)) {
                return true;
            }
        }
        return false;
    };
}
exports.$or = $or;
