"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$out = void 0;
const util_1 = require("../../util");
/**
 * Takes the documents returned by the aggregation pipeline and writes them to a specified collection.
 *
 * Unlike the $out operator in MongoDB, this operator can appear in any position in the pipeline and is
 * useful for collecting intermediate results of an aggregation operation.
 *
 * @param collection
 * @param expr
 * @param options
 * @returns {*}
 */
function $out(collection, expr, options) {
    util_1.assert(util_1.isArray(expr), '$out expression must be an array');
    return collection.map(o => {
        expr.push(o);
        return o; // passthrough
    });
}
exports.$out = $out;
