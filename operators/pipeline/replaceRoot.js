"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$replaceRoot = void 0;
const util_1 = require("../../util");
const core_1 = require("../../core");
/**
 * Replaces a document with the specified embedded document or new one.
 * The replacement document can be any valid expression that resolves to a document.
 *
 * https://docs.mongodb.com/manual/reference/operator/aggregation/replaceRoot/
 *
 * @param  {Iterator} collection
 * @param  {Object} expr
 * @param  {Object} options
 * @return {*}
 */
function $replaceRoot(collection, expr, options) {
    return collection.map(obj => {
        obj = core_1.computeValue(obj, expr.newRoot, null, options);
        util_1.assert(util_1.isObject(obj), '$replaceRoot expression must return an object');
        return obj;
    });
}
exports.$replaceRoot = $replaceRoot;
