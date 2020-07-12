"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$stdDevSamp = void 0;
const util_1 = require("../../util");
const push_1 = require("./push");
const _internal_1 = require("./_internal");
/**
 * Returns the sample standard deviation of the input values.
 * @param  {Array} collection
 * @param  {Object} expr
 * @return {Number|null}
 */
function $stdDevSamp(collection, expr, options) {
    return _internal_1.stddev(push_1.$push(collection, expr, options).filter(util_1.isNumber), true);
}
exports.$stdDevSamp = $stdDevSamp;
