"use strict";
// Date Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#date-expression-operators
Object.defineProperty(exports, "__esModule", { value: true });
exports.$year = void 0;
const _internal_1 = require("./_internal");
/**
 * Returns the year for a date as a number (e.g. 2014).
 * @param obj
 * @param expr
 */
function $year(obj, expr, options) {
    let d = _internal_1.computeDate(obj, expr, options);
    return d.getUTCFullYear();
}
exports.$year = $year;
