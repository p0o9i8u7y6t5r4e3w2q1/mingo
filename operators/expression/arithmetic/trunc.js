"use strict";
// Arithmetic Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#arithmetic-expression-operators
Object.defineProperty(exports, "__esModule", { value: true });
exports.$trunc = void 0;
const util_1 = require("../../../util");
const core_1 = require("../../../core");
const _internal_1 = require("./_internal");
/**
 * Truncates a number to a whole integer or to a specified decimal place.
 *
 * @param obj
 * @param expr
 * @returns {number}
 */
function $trunc(obj, expr, options) {
    let arr = core_1.computeValue(obj, expr, null, options);
    let num = arr[0];
    let places = arr[1];
    if (util_1.isNil(num) || isNaN(num) || Math.abs(num) === Infinity)
        return num;
    util_1.assert(util_1.isNumber(num), '$trunc expression must resolve to a number.');
    util_1.assert(util_1.isNil(places) || (util_1.isNumber(places) && places > -20 && places < 100), "$trunc expression has invalid place");
    return _internal_1.truncate(num, places, false);
}
exports.$trunc = $trunc;
