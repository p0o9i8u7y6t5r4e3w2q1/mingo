"use strict";
// Date Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#date-expression-operators
Object.defineProperty(exports, "__esModule", { value: true });
exports.$month = void 0;
const _internal_1 = require("./_internal");
/**
 * Returns the month for a date as a number between 1 (January) and 12 (December).
 * @param obj
 * @param expr
 */
function $month(obj, expr, options) {
    let d = _internal_1.computeDate(obj, expr, options);
    return d.getUTCMonth() + 1;
}
exports.$month = $month;
