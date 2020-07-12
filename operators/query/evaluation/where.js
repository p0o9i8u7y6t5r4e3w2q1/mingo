"use strict";
// Query Evaluation Operators: https://docs.mongodb.com/manual/reference/operator/query-evaluation/
Object.defineProperty(exports, "__esModule", { value: true });
exports.$where = void 0;
const util_1 = require("../../../util");
/**
 * Matches documents that satisfy a JavaScript expression.
 *
 * @param selector
 * @param value
 * @returns {Function}
 */
function $where(selector, value, options) {
    let f;
    if (!util_1.isFunction(value)) {
        f = new Function('return ' + value + ';');
    }
    else {
        f = value;
    }
    return obj => f.call(obj) === true;
}
exports.$where = $where;
