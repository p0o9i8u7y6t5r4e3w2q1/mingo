"use strict";
// Query Logical Operators: https://docs.mongodb.com/manual/reference/operator/query-logical/
Object.defineProperty(exports, "__esModule", { value: true });
exports.$nor = void 0;
const util_1 = require("../../../util");
const or_1 = require("./or");
/**
 * Joins query clauses with a logical NOR returns all documents that fail to match both clauses.
 *
 * @param selector
 * @param value
 * @returns {Function}
 */
function $nor(selector, value, options) {
    util_1.assert(util_1.isArray(value), 'Invalid expression. $nor expects value to be an Array');
    let f = or_1.$or('$or', value, options);
    return (obj) => !f(obj);
}
exports.$nor = $nor;
