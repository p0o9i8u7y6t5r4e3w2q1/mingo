"use strict";
// Date Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#date-expression-operators
Object.defineProperty(exports, "__esModule", { value: true });
exports.$dayOfWeek = void 0;
const _internal_1 = require("./_internal");
/**
 * Returns the day of the week for a date as a number between 1 (Sunday) and 7 (Saturday).
 * @param obj
 * @param expr
 */
function $dayOfWeek(obj, expr, options) {
    let d = _internal_1.computeDate(obj, expr, options);
    return d.getUTCDay() + 1;
}
exports.$dayOfWeek = $dayOfWeek;
