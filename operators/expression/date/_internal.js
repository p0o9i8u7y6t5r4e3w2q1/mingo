"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.regexStrip = exports.regexQuote = exports.padDigits = exports.computeDate = exports.adjustDate = exports.formatTimezone = exports.parseTimezone = exports.DATE_SYM_TABLE = exports.DATE_PART_INTERVAL = exports.DATE_FORMAT = exports.MINUTES_PER_HOUR = exports.MILLIS_PER_DAY = void 0;
const util_1 = require("../../../util");
const core_1 = require("../../../core");
exports.MILLIS_PER_DAY = 1000 * 60 * 60 * 24;
exports.MINUTES_PER_HOUR = 60;
// default format if unspecified
exports.DATE_FORMAT = "%Y-%m-%dT%H:%M:%S.%LZ";
// Inclusive interval of date parts
exports.DATE_PART_INTERVAL = [
    ['year', 0, 9999],
    ['month', 1, 12],
    ['day', 1, 31],
    ['hour', 0, 23],
    ['minute', 0, 59],
    ['second', 0, 59],
    ['millisecond', 0, 999]
];
// used for formatting dates in $dateToString operator
exports.DATE_SYM_TABLE = {
    '%Y': { name: 'year', padding: 4, re: /([0-9]{4})/ },
    '%G': { name: 'year', padding: 4, re: /([0-9]{4})/ },
    '%m': { name: 'month', padding: 2, re: /(0[1-9]|1[012])/ },
    '%d': { name: 'day', padding: 2, re: /(0[1-9]|[12][0-9]|3[01])/ },
    '%H': { name: 'hour', padding: 2, re: /([01][0-9]|2[0-3])/ },
    '%M': { name: 'minute', padding: 2, re: /([0-5][0-9])/ },
    '%S': { name: 'second', padding: 2, re: /([0-5][0-9]|60)/ },
    '%L': { name: 'millisecond', padding: 3, re: /([0-9]{3})/ },
    '%u': { name: 'weekDay', padding: 1, re: /([1-7])/ },
    '%V': { name: 'week', padding: 1, re: /([1-4][0-9]?|5[0-3]?)/ },
    '%z': { name: 'timezone', padding: 2, re: /(([+-][01][0-9]|2[0-3]):?([0-5][0-9])?)/ },
    '%Z': { name: 'minuteOffset', padding: 3, re: /([+-][0-9]{3})/ },
    '%%': '%'
};
/**
 * Parse and return the timezone string as a number
 * @param tzstr Timezone string matching '+/-hh[:][mm]'
 */
function parseTimezone(tzstr) {
    if (util_1.isNil(tzstr))
        return { hour: 0, minute: 0 };
    let m = tzstr.match(exports.DATE_SYM_TABLE['%z'].re);
    if (!m)
        throw Error(`invalid or location-based timezone '${tzstr}' not supported`);
    return {
        hour: parseInt(m[2]) || 0,
        minute: parseInt(m[3]) || 0
    };
}
exports.parseTimezone = parseTimezone;
/**
 * Formats the timezone for output
 * @param tz A timezone object
 */
function formatTimezone(tz) {
    return (tz.hour < 0 ? "-" : "+") + padDigits(Math.abs(tz.hour), 2) + padDigits(tz.minute, 2);
}
exports.formatTimezone = formatTimezone;
/**
 * Adjust the date by the given timezone
 * @param d Date object
 * @param tz Timezone
 */
function adjustDate(d, tz) {
    let sign = tz.hour < 0 ? -1 : 1;
    d.setUTCHours(d.getUTCHours() + tz.hour);
    d.setUTCMinutes(d.getUTCMinutes() + (sign * tz.minute));
}
exports.adjustDate = adjustDate;
/**
 * Computes a date expression
 */
function computeDate(obj, expr, options) {
    let d = core_1.computeValue(obj, expr, null, options);
    if (util_1.isDate(d))
        return d;
    if (util_1.isString(d))
        throw Error('cannot take a string as an argument');
    let tz = null;
    if (util_1.isObject(d) && util_1.has(d, 'date') && util_1.has(d, 'timezone')) {
        tz = parseTimezone(core_1.computeValue(obj, d.timezone, null, options));
        d = core_1.computeValue(obj, d.date, null, options);
    }
    d = new Date(d);
    if (isNaN(d.getTime()))
        throw Error(`cannot convert ${obj} to date`);
    adjustDate(d, tz);
    return d;
}
exports.computeDate = computeDate;
function padDigits(n, digits) {
    return new Array(Math.max(digits - String(n).length + 1, 0)).join('0') + n;
}
exports.padDigits = padDigits;
function regexQuote(s) {
    "^.-*?$".split('').forEach((c) => {
        s = s.replace(c, `\\${c}`);
    });
    return s;
}
exports.regexQuote = regexQuote;
function regexStrip(s) {
    return s.replace(/^\//, '').replace(/\/$/, '');
}
exports.regexStrip = regexStrip;
