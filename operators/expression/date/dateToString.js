"use strict";
// Date Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#date-expression-operators
Object.defineProperty(exports, "__esModule", { value: true });
exports.$dateToString = void 0;
const core_1 = require("../../../core");
const util_1 = require("../../../util");
const _internal_1 = require("./_internal");
const year_1 = require("./year");
const month_1 = require("./month");
const dayOfMonth_1 = require("./dayOfMonth");
const dayOfWeek_1 = require("./dayOfWeek");
const hour_1 = require("./hour");
const minute_1 = require("./minute");
const second_1 = require("./second");
const millisecond_1 = require("./millisecond");
const week_1 = require("./week");
// date functions for format specifiers
const DATE_FUNCTIONS = {
    '%Y': year_1.$year,
    '%G': year_1.$year,
    '%m': month_1.$month,
    '%d': dayOfMonth_1.$dayOfMonth,
    '%H': hour_1.$hour,
    '%M': minute_1.$minute,
    '%S': second_1.$second,
    '%L': millisecond_1.$millisecond,
    '%u': dayOfWeek_1.$dayOfWeek,
    '%V': week_1.$week,
    '%z': null,
    '%Z': null,
    '%%': '%'
};
/**
 * Returns the date as a formatted string.
 *
 * %d	Day of Month (2 digits, zero padded)	01-31
 * %G	Year in ISO 8601 format	0000-9999
 * %H	Hour (2 digits, zero padded, 24-hour clock)	00-23
 * %L	Millisecond (3 digits, zero padded)	000-999
 * %m	Month (2 digits, zero padded)	01-12
 * %M	Minute (2 digits, zero padded)	00-59
 * %S	Second (2 digits, zero padded)	00-60
 * %u	Day of week number in ISO 8601 format (1-Monday, 7-Sunday)	1-7
 * %V	Week of Year in ISO 8601 format	1-53
 * %Y	Year (4 digits, zero padded)	0000-9999
 * %z	The timezone offset from UTC.	+/-[hh][mm]
 * %Z	The minutes offset from UTC as a number. For example, if the timezone offset (+/-[hhmm]) was +0445, the minutes offset is +285.	+/-mmm
 * %%	Percent Character as a Literal	%
 *
 * @param obj current object
 * @param expr operator expression
 */
function $dateToString(obj, expr, options) {
    let args = core_1.computeValue(obj, expr, null, options);
    if (util_1.isNil(args.onNull))
        args.onNull = null;
    if (util_1.isNil(args.date))
        return args.onNull;
    let date = _internal_1.computeDate(obj, args.date, options);
    let format = args.format || _internal_1.DATE_FORMAT;
    let tz = _internal_1.parseTimezone(args.timezone);
    let matches = format.match(/(%%|%Y|%G|%m|%d|%H|%M|%S|%L|%u|%V|%z|%Z)/g);
    // adjust the date to reflect timezone
    _internal_1.adjustDate(date, tz);
    for (let i = 0, len = matches.length; i < len; i++) {
        let formatSpecifier = matches[i];
        let props = _internal_1.DATE_SYM_TABLE[formatSpecifier];
        let operatorFn = DATE_FUNCTIONS[formatSpecifier];
        let value;
        if (util_1.isObject(props)) {
            // reuse date
            if (props.name === 'timezone') {
                value = _internal_1.formatTimezone(tz);
            }
            else if (props.name === 'minuteOffset') {
                value = `${(tz.hour < 0 ? -1 : 1) * Math.abs(tz.hour * _internal_1.MINUTES_PER_HOUR) + tz.minute}`;
            }
            else if (operatorFn != null) {
                value = _internal_1.padDigits(operatorFn(obj, date, options), props.padding);
            }
            else {
                value = props;
            }
        }
        else {
            value = props;
        }
        // replace the match with resolved value
        format = format.replace(formatSpecifier, value);
    }
    return format;
}
exports.$dateToString = $dateToString;
