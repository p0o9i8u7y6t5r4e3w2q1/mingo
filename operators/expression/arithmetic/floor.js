"use strict";
// Arithmetic Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#arithmetic-expression-operators
Object.defineProperty(exports, "__esModule", { value: true });
exports.$floor = void 0;
const util_1 = require("../../../util");
const core_1 = require("../../../core");
/**
 * Returns the largest integer less than or equal to the specified number.
 *
 * @param obj
 * @param expr
 * @returns {number}
 */
function $floor(obj, expr, options) {
    let arg = core_1.computeValue(obj, expr, null, options);
    if (util_1.isNil(arg))
        return null;
    util_1.assert(util_1.isNumber(arg) || isNaN(arg), '$floor expression must resolve to a number.');
    return Math.floor(arg);
}
exports.$floor = $floor;
