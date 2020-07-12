"use strict";
// Date Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#date-expression-operators
Object.defineProperty(exports, "__esModule", { value: true });
exports.$second = void 0;
const _internal_1 = require("./_internal");
/**
 * Returns the seconds for a date as a number between 0 and 60 (leap seconds).
 * @param obj
 * @param expr
 */
function $second(obj, expr, options) {
    let d = _internal_1.computeDate(obj, expr, options);
    return d.getUTCSeconds();
}
exports.$second = $second;
