"use strict";
// Arithmetic Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#arithmetic-expression-operators
Object.defineProperty(exports, "__esModule", { value: true });
exports.$add = void 0;
const util_1 = require("../../../util");
const core_1 = require("../../../core");
/**
 * Computes the sum of an array of numbers.
 *
 * @param obj
 * @param expr
 * @returns {Object}
 */
function $add(obj, expr, options) {
    let args = core_1.computeValue(obj, expr, null, options);
    let foundDate = false;
    let result = args.reduce((acc, val) => {
        if (util_1.isDate(val)) {
            util_1.assert(!foundDate, "'$add' can only have one date value");
            foundDate = true;
            val = val.getTime();
        }
        // assume val is a number
        acc += val;
        return acc;
    }, 0);
    return foundDate ? new Date(result) : result;
}
exports.$add = $add;
