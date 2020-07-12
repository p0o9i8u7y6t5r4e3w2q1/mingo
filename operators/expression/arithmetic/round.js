"use strict";
// Arithmetic Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#arithmetic-expression-operators
Object.defineProperty(exports, "__esModule", { value: true });
exports.$round = void 0;
const util_1 = require("../../../util");
const core_1 = require("../../../core");
const _internal_1 = require("./_internal");
/**
 * Rounds a number to to a whole integer or to a specified decimal place.
 * @param {*} obj
 * @param {*} expr
 */
function $round(obj, expr, options) {
    let args = core_1.computeValue(obj, expr, null, options);
    let num = args[0];
    let place = args[1];
    if (util_1.isNil(num) || isNaN(num) || Math.abs(num) === Infinity)
        return num;
    util_1.assert(util_1.isNumber(num), '$round expression must resolve to a number.');
    return _internal_1.truncate(num, place, true);
}
exports.$round = $round;
