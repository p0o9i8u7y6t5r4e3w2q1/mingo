"use strict";
// Date Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#date-expression-operators
Object.defineProperty(exports, "__esModule", { value: true });
exports.$dateToParts = void 0;
const core_1 = require("../../../core");
const _internal_1 = require("./_internal");
/**
 * Returns a document that contains the constituent parts of a given Date value as individual properties.
 * The properties returned are year, month, day, hour, minute, second and millisecond.
 *
 * @param obj
 * @param expr
 * @param options
 */
function $dateToParts(obj, expr, options) {
    let args = core_1.computeValue(obj, expr, null, options);
    if (args.iso8601 === true)
        throw new Error("$dateToParts: argument 'iso8601' is not supported");
    let d = new Date(args.date);
    let tz = _internal_1.parseTimezone(args.timezone);
    // invert timezone to construct value in UTC
    tz.hour *= -1;
    tz.minute *= -1;
    _internal_1.adjustDate(d, tz);
    return {
        year: d.getUTCFullYear(),
        month: d.getUTCMonth() + 1,
        day: d.getUTCDate(),
        hour: d.getUTCHours(),
        minute: d.getUTCMinutes(),
        second: d.getUTCSeconds(),
        millisecond: d.getUTCMilliseconds()
    };
}
exports.$dateToParts = $dateToParts;
