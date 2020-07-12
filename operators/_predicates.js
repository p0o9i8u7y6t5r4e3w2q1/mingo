"use strict";
/**
 * Predicates used for Query and Expression operators.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.$type = exports.$elemMatch = exports.$size = exports.$all = exports.$exists = exports.$regex = exports.$mod = exports.$gte = exports.$gt = exports.$lte = exports.$lt = exports.$nin = exports.$in = exports.$ne = exports.$eq = exports.createExpressionOperator = exports.createQueryOperator = void 0;
const util_1 = require("../util");
const query_1 = require("../query");
const core_1 = require("../core");
/**
 * Returns a query operator created from the predicate
 *
 * @param pred Predicate function
 */
function createQueryOperator(pred) {
    return (selector, value, options) => {
        let opts = { unwrapArray: true };
        return (obj) => {
            // value of field must be fully resolved.
            let lhs = util_1.resolve(obj, selector, opts);
            return pred(lhs, value);
        };
    };
}
exports.createQueryOperator = createQueryOperator;
/**
 * Returns an expression operator created from the predicate
 *
 * @param f Predicate function
 */
function createExpressionOperator(f) {
    return (obj, expr, options) => {
        let args = core_1.computeValue(obj, expr, null, options);
        return f(...args);
    };
}
exports.createExpressionOperator = createExpressionOperator;
/**
 * Checks that two values are equal.
 *
 * @param a         The lhs operand as resolved from the object by the given selector
 * @param b         The rhs operand provided by the user
 * @returns {*}
 */
function $eq(a, b) {
    // start with simple equality check
    if (util_1.isEqual(a, b))
        return true;
    // https://docs.mongodb.com/manual/tutorial/query-for-null-fields/
    if (util_1.isNil(a) && util_1.isNil(b))
        return true;
    // check
    if (util_1.isArray(a)) {
        let eq = util_1.isEqual.bind(null, b);
        return a.some(eq) || util_1.flatten(a, 1).some(eq);
    }
    return false;
}
exports.$eq = $eq;
/**
 * Matches all values that are not equal to the value specified in the query.
 *
 * @param a
 * @param b
 * @returns {boolean}
 */
function $ne(a, b) {
    return !$eq(a, b);
}
exports.$ne = $ne;
/**
 * Matches any of the values that exist in an array specified in the query.
 *
 * @param a
 * @param b
 * @returns {*}
 */
function $in(a, b) {
    // queries for null should be able to find undefined fields
    if (util_1.isNil(a))
        return b.some(util_1.isNull);
    return util_1.intersection(util_1.ensureArray(a), b).length > 0;
}
exports.$in = $in;
/**
 * Matches values that do not exist in an array specified to the query.
 *
 * @param a
 * @param b
 * @returns {*|boolean}
 */
function $nin(a, b) {
    return !$in(a, b);
}
exports.$nin = $nin;
/**
 * Matches values that are less than the value specified in the query.
 *
 * @param a
 * @param b
 * @returns {boolean}
 */
function $lt(a, b) {
    return compare(a, b, (x, y) => x < y);
}
exports.$lt = $lt;
/**
 * Matches values that are less than or equal to the value specified in the query.
 *
 * @param a
 * @param b
 * @returns {boolean}
 */
function $lte(a, b) {
    return compare(a, b, (x, y) => x <= y);
}
exports.$lte = $lte;
/**
 * Matches values that are greater than the value specified in the query.
 *
 * @param a
 * @param b
 * @returns {boolean}
 */
function $gt(a, b) {
    return compare(a, b, (x, y) => x > y);
}
exports.$gt = $gt;
/**
 * Matches values that are greater than or equal to the value specified in the query.
 *
 * @param a
 * @param b
 * @returns {boolean}
 */
function $gte(a, b) {
    return compare(a, b, (x, y) => x >= y);
}
exports.$gte = $gte;
/**
 * Performs a modulo operation on the value of a field and selects documents with a specified result.
 *
 * @param a
 * @param b
 * @returns {boolean}
 */
function $mod(a, b) {
    return util_1.ensureArray(a).some((x) => b.length === 2 && (x % b[0]) === b[1]);
}
exports.$mod = $mod;
/**
 * Selects documents where values match a specified regular expression.
 *
 * @param a
 * @param b
 * @returns {boolean}
 */
function $regex(a, b) {
    a = util_1.ensureArray(a);
    let match = ((x) => util_1.isString(x) && !!x.match(b));
    return a.some(match) || util_1.flatten(a, 1).some(match);
}
exports.$regex = $regex;
/**
 * Matches documents that have the specified field.
 *
 * @param a
 * @param b
 * @returns {boolean}
 */
function $exists(a, b) {
    return ((b === false || b === 0) && a === undefined) || ((b === true || b === 1) && a !== undefined);
}
exports.$exists = $exists;
/**
 * Matches arrays that contain all elements specified in the query.
 *
 * @param a
 * @param b
 * @returns boolean
 */
function $all(a, b) {
    let matched = false;
    if (util_1.isArray(a) && util_1.isArray(b)) {
        for (let i = 0, len = b.length; i < len; i++) {
            if (util_1.isObject(b[i]) && util_1.inArray(util_1.keys(b[i]), '$elemMatch')) {
                matched = matched || $elemMatch(a, b[i].$elemMatch);
            }
            else {
                // order of arguments matter
                return util_1.intersection(b, a).length === len;
            }
        }
    }
    return matched;
}
exports.$all = $all;
/**
 * Selects documents if the array field is a specified size.
 *
 * @param a
 * @param b
 * @returns {*|boolean}
 */
function $size(a, b) {
    return a.length === b;
}
exports.$size = $size;
/**
 * Selects documents if element in the array field matches all the specified $elemMatch condition.
 *
 * @param a {Array} element to match against
 * @param b {Object} subquery
 */
function $elemMatch(a, b) {
    // should return false for non-matching input
    if (util_1.isArray(a) && !util_1.isEmpty(a)) {
        let format = (x) => x;
        let criteria = b;
        // If we find an operator in the subquery, we fake a field to point to it.
        // This is an attempt to ensure that it a valid criteria.
        if (util_1.keys(b).every(util_1.isOperator)) {
            criteria = { temp: b };
            format = x => ({ temp: x });
        }
        let query = new query_1.Query(criteria);
        for (let i = 0, len = a.length; i < len; i++) {
            if (query.test(format(a[i]))) {
                return true;
            }
        }
    }
    return false;
}
exports.$elemMatch = $elemMatch;
/**
 * Selects documents if a field is of the specified type.
 *
 * @param a
 * @param b
 * @returns {boolean}
 */
function $type(a, b) {
    switch (b) {
        case 1:
        case 19:
        case util_1.BsonType.DOUBLE:
        case util_1.BsonType.DECIMAL:
            return util_1.isNumber(a);
        case 2:
        case util_1.JsType.STRING:
            return util_1.isString(a);
        case 3:
        case util_1.JsType.OBJECT:
            return util_1.isObject(a);
        case 4:
        case util_1.JsType.ARRAY:
            return util_1.isArray(a);
        case 6:
        case util_1.JsType.UNDEFINED:
            return util_1.isNil(a);
        case 8:
        case util_1.JsType.BOOLEAN:
        case util_1.BsonType.BOOL:
            return util_1.isBoolean(a);
        case 9:
        case util_1.JsType.DATE:
            return util_1.isDate(a);
        case 10:
        case util_1.JsType.NULL:
            return util_1.isNull(a);
        case 11:
        case util_1.JsType.REGEXP:
        case util_1.BsonType.REGEX:
            return util_1.isRegExp(a);
        case 16:
        case util_1.BsonType.INT:
            return util_1.isNumber(a) && a >= util_1.MIN_INT && a <= util_1.MAX_INT && a.toString().indexOf('.') === -1;
        case 18:
        case util_1.BsonType.LONG:
            return util_1.isNumber(a) && a >= util_1.MIN_LONG && a <= util_1.MAX_LONG && a.toString().indexOf('.') === -1;
        default:
            return false;
    }
}
exports.$type = $type;
function compare(a, b, f) {
    return util_1.ensureArray(a).some(x => util_1.getType(x) === util_1.getType(b) && f(x, b));
}
