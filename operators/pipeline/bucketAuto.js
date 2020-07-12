"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$bucketAuto = void 0;
const util_1 = require("../../util");
const core_1 = require("../../core");
/**
 * Categorizes incoming documents into a specific number of groups, called buckets,
 * based on a specified expression. Bucket boundaries are automatically determined
 * in an attempt to evenly distribute the documents into the specified number of buckets.
 * https://docs.mongodb.com/manual/reference/operator/aggregation/bucketAuto/
 *
 * @param {*} collection
 * @param {*} expr
 * @param {*} options
 */
function $bucketAuto(collection, expr, options) {
    let outputExpr = expr.output || { 'count': { '$sum': 1 } };
    let groupByExpr = expr.groupBy;
    let bucketCount = expr.buckets;
    util_1.assert(bucketCount > 0, "The $bucketAuto 'buckets' field must be greater than 0, but found: " + bucketCount);
    const ID_KEY = '_id';
    return collection.transform(coll => {
        let approxBucketSize = Math.max(1, Math.round(coll.length / bucketCount));
        let computeValueOptimized = util_1.memoize(core_1.computeValue);
        let grouped = {};
        let remaining = [];
        let sorted = util_1.sortBy(coll, o => {
            let key = computeValueOptimized(o, groupByExpr, null, options);
            if (util_1.isNil(key)) {
                remaining.push(o);
            }
            else {
                grouped[key] || (grouped[key] = []);
                grouped[key].push(o);
            }
            return key;
        });
        let result = [];
        let index = 0; // counter for sorted collection
        for (let i = 0, len = sorted.length; i < bucketCount && index < len; i++) {
            let boundaries = Object.create({ min: 0, max: 0 });
            let bucketItems = [];
            for (let j = 0; j < approxBucketSize && index < len; j++) {
                let key = computeValueOptimized(sorted[index], groupByExpr, null, options);
                if (util_1.isNil(key))
                    key = null;
                // populate current bucket with all values for current key
                util_1.into(bucketItems, util_1.isNil(key) ? remaining : grouped[key]);
                // increase sort index by number of items added
                index += (util_1.isNil(key) ? remaining.length : grouped[key].length);
                // set the min key boundary if not already present
                if (!util_1.has(boundaries, 'min'))
                    boundaries.min = key;
                if (result.length > 0) {
                    let lastBucket = result[result.length - 1];
                    lastBucket[ID_KEY].max = boundaries.min;
                }
            }
            // if is last bucket add remaining items
            if (i == bucketCount - 1) {
                util_1.into(bucketItems, sorted.slice(index));
            }
            result.push(util_1.into(core_1.computeValue(bucketItems, outputExpr, null, options), { '_id': boundaries }));
        }
        if (result.length > 0) {
            result[result.length - 1][ID_KEY].max = computeValueOptimized(sorted[sorted.length - 1], groupByExpr, null, options);
        }
        return result;
    });
}
exports.$bucketAuto = $bucketAuto;
