"use strict";
// Date Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#date-expression-operators
Object.defineProperty(exports, "__esModule", { value: true });
exports.$dateFromString = void 0;
const core_1 = require("../../../core");
const util_1 = require("../../../util");
const _internal_1 = require("./_internal");
/**
 * Converts a date/time string to a date object.
 * @param obj
 * @param expr
 */
function $dateFromString(obj, expr, options) {
    let args = core_1.computeValue(obj, expr, null, options);
    args.format = args.format || _internal_1.DATE_FORMAT;
    args.onNull = args.onNull || null;
    let dateString = args.dateString;
    if (util_1.isNil(dateString))
        return args.onNull;
    // collect all separators of the format string
    let separators = args.format.split(/%[YGmdHMSLuVzZ]/);
    separators.reverse();
    let matches = args.format.match(/(%%|%Y|%G|%m|%d|%H|%M|%S|%L|%u|%V|%z|%Z)/g);
    let dateParts = {};
    // holds the valid regex of parts that matches input date string
    let expectedPattern = '';
    for (let i = 0, len = matches.length; i < len; i++) {
        let formatSpecifier = matches[i];
        let props = _internal_1.DATE_SYM_TABLE[formatSpecifier];
        if (util_1.isObject(props)) {
            // get pattern and alias from table
            let m = dateString.match(props.re);
            // get the next separtor
            let delimiter = separators.pop() || '';
            if (m !== null) {
                // store and cut out matched part
                dateParts[props.name] = m[0].match(/^\d+$/) ? parseInt(m[0]) : m[0];
                dateString = dateString.substr(0, m.index) + dateString.substr(m.index + m[0].length);
                // construct expected pattern
                expectedPattern += (_internal_1.regexQuote(delimiter) + _internal_1.regexStrip(props.re.toString()));
            }
            else {
                dateParts[props.name] = null;
            }
        }
    }
    // 1. validate all required date parts exists
    // 2. validate original dateString against expected pattern.
    if (util_1.isNil(dateParts.year)
        || util_1.isNil(dateParts.month)
        || util_1.isNil(dateParts.day)
        || !args.dateString.match(new RegExp('^' + expectedPattern + '$')))
        return args.onError;
    let tz = _internal_1.parseTimezone(args.timezone);
    // create the date. month is 0-based in Date
    let d = new Date(Date.UTC(dateParts.year, dateParts.month - 1, dateParts.day, 0, 0, 0));
    if (!util_1.isNil(dateParts.hour))
        d.setUTCHours(dateParts.hour);
    if (!util_1.isNil(dateParts.minute))
        d.setUTCMinutes(dateParts.minute);
    if (!util_1.isNil(dateParts.second))
        d.setUTCSeconds(dateParts.second);
    if (!util_1.isNil(dateParts.millisecond))
        d.setUTCMilliseconds(dateParts.millisecond);
    // The minute part is unused when converting string.
    // This was observed in the tests on MongoDB site but not officially stated anywhere
    tz.minute = 0;
    _internal_1.adjustDate(d, tz);
    return d;
}
exports.$dateFromString = $dateFromString;
