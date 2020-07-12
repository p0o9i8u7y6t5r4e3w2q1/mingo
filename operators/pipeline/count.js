"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$count = void 0;
const util_1 = require("../../util");
const lazy_1 = require("../../lazy");
/**
 * Returns a document that contains a count of the number of documents input to the stage.
 *
 * @param {Array} collection
 * @param {String} expr
 * @param {Options} options
 * @return {Object}
 */
function $count(collection, expr, options) {
    util_1.assert(util_1.isString(expr) && expr.trim() !== '' && expr.indexOf('.') === -1 && expr.trim()[0] !== '$', 'Invalid expression value for $count');
    return lazy_1.Lazy(() => {
        let o = {};
        o[expr] = collection.size();
        return { value: o, done: false };
    }).first();
}
exports.$count = $count;
