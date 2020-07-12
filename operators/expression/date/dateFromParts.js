"use strict";
// Date Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#date-expression-operators
Object.defineProperty(exports, "__esModule", { value: true });
exports.$dateFromParts = void 0;
const core_1 = require("../../../core");
const _internal_1 = require("./_internal");
/**
 * Constructs and returns a Date object given the date’s constituent properties.
 *
 * @param obj The document
 * @param expr The date expression
 * @param options Options
 */
function $dateFromParts(obj, expr, options) {
    let args = core_1.computeValue(obj, expr, null, options);
    let tz = _internal_1.parseTimezone(args.timezone);
    // assign default and adjust value ranges of the different parts
    for (let i = _internal_1.DATE_PART_INTERVAL.length - 1, remainder = 0; i >= 0; i--) {
        let [k, min, max] = _internal_1.DATE_PART_INTERVAL[i];
        min = min;
        max = max;
        // add remainder from previous part. units should already be correct
        let part = (args[k] || 0) + remainder;
        // 1. compute the remainder for the next part
        // 2. adjust the current part to a valid range
        // 3. assign back to 'args'
        let limit = max + 1;
        // invert timezone to adjust the hours to UTC
        if (k == 'hour')
            part += (tz.hour * -1);
        if (k == 'minute')
            part += (tz.minute * -1);
        // smaller than lower bound
        if (part < min) {
            let delta = min - part;
            remainder = -1 * Math.ceil(delta / limit);
            part = limit - (delta % limit);
        }
        else if (part > max) {
            // offset with the 'min' value to adjust non-zero date parts correctly
            part += min;
            remainder = Math.trunc(part / limit);
            part %= limit;
        }
        // reassign
        args[k] = part;
    }
    return new Date(Date.UTC(args.year, args.month - 1, args.day, args.hour, args.minute, args.second, args.millisecond));
}
exports.$dateFromParts = $dateFromParts;
