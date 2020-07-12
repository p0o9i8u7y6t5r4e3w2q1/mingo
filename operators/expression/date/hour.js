"use strict";
// Date Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#date-expression-operators
Object.defineProperty(exports, "__esModule", { value: true });
exports.$hour = void 0;
const _internal_1 = require("./_internal");
/**
 * Returns the hour for a date as a number between 0 and 23.
 * @param obj
 * @param expr
 */
function $hour(obj, expr, options) {
    let d = _internal_1.computeDate(obj, expr, options);
    return d.getUTCHours();
}
exports.$hour = $hour;
