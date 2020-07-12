"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$bucket = void 0;
const util_1 = require("../../util");
const core_1 = require("../../core");
const lazy_1 = require("../../lazy");
/**
 * Categorizes incoming documents into groups, called buckets, based on a specified expression and bucket boundaries.
 * https://docs.mongodb.com/manual/reference/operator/aggregation/bucket/
 *
 * @param {*} collection
 * @param {*} expr
 * @param {Options} opt Pipeline options
 */
function $bucket(collection, expr, options) {
    let boundaries = expr.boundaries;
    let defaultKey = expr['default'];
    let lower = boundaries[0]; // inclusive
    let upper = boundaries[boundaries.length - 1]; // exclusive
    let outputExpr = expr.output || { 'count': { '$sum': 1 } };
    util_1.assert(boundaries.length > 2, "$bucket 'boundaries' expression must have at least 3 elements");
    let boundType = util_1.getType(lower);
    for (let i = 0, len = boundaries.length - 1; i < len; i++) {
        util_1.assert(boundType === util_1.getType(boundaries[i + 1]), "$bucket 'boundaries' must all be of the same type");
        util_1.assert(boundaries[i] < boundaries[i + 1], "$bucket 'boundaries' must be sorted in ascending order");
    }
    !util_1.isNil(defaultKey)
        && (util_1.getType(expr.default) === util_1.getType(lower))
        && util_1.assert(lower > expr.default || upper < expr.default, "$bucket 'default' expression must be out of boundaries range");
    let grouped = {};
    util_1.each(boundaries, (k) => grouped[k] = []);
    // add default key if provided
    if (!util_1.isNil(defaultKey))
        grouped[defaultKey] = [];
    let iterator = null;
    return lazy_1.Lazy(() => {
        if (iterator === null) {
            collection.each((obj) => {
                let key = core_1.computeValue(obj, expr.groupBy, null, options);
                if (util_1.isNil(key) || key < lower || key >= upper) {
                    util_1.assert(!util_1.isNil(defaultKey), '$bucket require a default for out of range values');
                    grouped[defaultKey].push(obj);
                }
                else {
                    util_1.assert(key >= lower && key < upper, "$bucket 'groupBy' expression must resolve to a value in range of boundaries");
                    let index = findInsertIndex(boundaries, key);
                    let boundKey = boundaries[Math.max(0, index - 1)];
                    grouped[boundKey].push(obj);
                }
            });
            // upper bound is exclusive so we remove it
            boundaries.pop();
            if (!util_1.isNil(defaultKey))
                boundaries.push(defaultKey);
            iterator = lazy_1.Lazy(boundaries).map(key => {
                let acc = core_1.computeValue(grouped[key], outputExpr, null, options);
                return util_1.into(acc, { '_id': key });
            });
        }
        return iterator.next();
    });
}
exports.$bucket = $bucket;
/**
 * Find the insert index for the given key in a sorted array.
 *
 * @param {*} sorted The sorted array to search
 * @param {*} item The search key
 */
function findInsertIndex(sorted, item) {
    // uses binary search
    let lo = 0;
    let hi = sorted.length - 1;
    while (lo <= hi) {
        let mid = Math.round(lo + (hi - lo) / 2);
        if (item < sorted[mid]) {
            hi = mid - 1;
        }
        else if (item > sorted[mid]) {
            lo = mid + 1;
        }
        else {
            return mid;
        }
    }
    return lo;
}
