"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$group = void 0;
const util_1 = require("../../util");
const core_1 = require("../../core");
/**
 * Groups documents together for the purpose of calculating aggregate values based on a collection of documents.
 *
 * @param collection
 * @param expr
 * @param options
 * @returns {Array}
 */
function $group(collection, expr, options) {
    // lookup key for grouping
    const ID_KEY = '_id';
    let id = expr[ID_KEY];
    return collection.transform(coll => {
        let partitions = util_1.groupBy(coll, obj => core_1.computeValue(obj, id, null, options));
        // remove the group key
        expr = util_1.into({}, expr);
        delete expr[ID_KEY];
        let i = -1;
        let size = partitions.keys.length;
        return () => {
            if (++i === size)
                return { done: true };
            let value = partitions.keys[i];
            let obj = {};
            // exclude undefined key value
            if (value !== undefined) {
                obj[ID_KEY] = value;
            }
            // compute remaining keys in expression
            util_1.each(expr, (val, key) => {
                obj[key] = core_1.computeValue(partitions.groups[i], val, key, options);
            });
            return { value: obj, done: false };
        };
    });
}
exports.$group = $group;
