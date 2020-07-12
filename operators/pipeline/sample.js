"use strict";
// $sample operator -  https://docs.mongodb.com/manual/reference/operator/aggregation/sample/
Object.defineProperty(exports, "__esModule", { value: true });
exports.$sample = void 0;
const util_1 = require("../../util");
/**
 * Randomly selects the specified number of documents from its input. The given iterator must have finite values
 *
 * @param  {Iterator} collection
 * @param  {Object} expr
 * @param  {Options} options
 * @return {*}
 */
function $sample(collection, expr, options) {
    let size = expr.size;
    util_1.assert(util_1.isNumber(size), '$sample size must be a positive integer');
    return collection.transform(xs => {
        let len = xs.length;
        let i = -1;
        return () => {
            if (++i === size)
                return { done: true };
            let n = Math.floor(Math.random() * len);
            return { value: xs[n], done: false };
        };
    });
}
exports.$sample = $sample;
