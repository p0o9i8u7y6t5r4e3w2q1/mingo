"use strict";
// Array Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#array-expression-operators
Object.defineProperty(exports, "__esModule", { value: true });
exports.$map = void 0;
const util_1 = require("../../../util");
const core_1 = require("../../../core");
/**
 * Applies a sub-expression to each element of an array and returns the array of resulting values in order.
 *
 * @param obj
 * @param expr
 * @returns {Array|*}
 */
function $map(obj, expr, options) {
    let inputExpr = core_1.computeValue(obj, expr.input, null, options);
    util_1.assert(util_1.isArray(inputExpr), `$map 'input' expression must resolve to an array`);
    let asExpr = expr['as'] || 'this';
    let inExpr = expr['in'];
    // HACK: add the "as" expression as a value on the object to take advantage of "resolve()"
    // which will reduce to that value when invoked. The reference to the as expression will be prefixed with "$$".
    // But since a "$" is stripped of before passing the name to "resolve()" we just need to prepend "$" to the key.
    let tempKey = '$' + asExpr;
    return inputExpr.map((v) => {
        obj[tempKey] = v;
        return core_1.computeValue(obj, inExpr, null, options);
    });
}
exports.$map = $map;
