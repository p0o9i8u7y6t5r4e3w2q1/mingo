"use strict";
// Query Logical Operators: https://docs.mongodb.com/manual/reference/operator/query-logical/
Object.defineProperty(exports, "__esModule", { value: true });
exports.$not = void 0;
const util_1 = require("../../../util");
const query_1 = require("../../../query");
/**
 * Inverts the effect of a query expression and returns documents that do not match the query expression.
 *
 * @param selector
 * @param value
 * @returns {Function}
 */
function $not(selector, value, options) {
    let criteria = {};
    criteria[selector] = util_1.normalize(value);
    let query = new query_1.Query(criteria, options.config);
    return obj => !query.test(obj);
}
exports.$not = $not;
