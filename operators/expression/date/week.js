"use strict";
// Date Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#date-expression-operators
Object.defineProperty(exports, "__esModule", { value: true });
exports.$week = void 0;
const _internal_1 = require("./_internal");
/**
 * Returns the week number for a date as a number between 0
 * (the partial week that precedes the first Sunday of the year) and 53 (leap year).
 * @param obj
 * @param expr
 */
function $week(obj, expr, options) {
    // source: http://stackoverflow.com/a/6117889/1370481
    let d = _internal_1.computeDate(obj, expr, options);
    // Copy date so don't modify original
    d = new Date(+d);
    d.setUTCHours(0, 0, 0);
    // Set to nearest Thursday: current date + 4 - current day number
    // Make Sunday's day number 7
    d.setDate(d.getDate() + 4 - (d.getDay() || 7));
    // Get first day of year
    let yearStart = new Date(d.getUTCFullYear(), 0, 1);
    // Calculate full weeks to nearest Thursday
    return Math.floor((((d.getTime() - yearStart.getTime()) / 8.64e7) + 1) / 7);
}
exports.$week = $week;
