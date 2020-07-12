"use strict";
// Date Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#date-expression-operators
Object.defineProperty(exports, "__esModule", { value: true });
exports.$dayOfYear = void 0;
const _internal_1 = require("./_internal");
/**
 * Returns the day of the year for a date as a number between 1 and 366 (leap year).
 * @param obj
 * @param expr
 */
function $dayOfYear(obj, expr, options) {
    let d = _internal_1.computeDate(obj, expr, options);
    let start = new Date(d.getUTCFullYear(), 0, 0);
    let diff = d.getTime() - start.getTime();
    return Math.round(diff / _internal_1.MILLIS_PER_DAY);
}
exports.$dayOfYear = $dayOfYear;
