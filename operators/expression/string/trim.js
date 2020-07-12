"use strict";
/**
 * String Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#string-expression-operators
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.$trim = void 0;
const _internal_1 = require("./_internal");
/**
 * Removes whitespace characters, including null, or the specified characters from the beginning and end of a string.
 *
 * @param obj
 * @param expr
 */
function $trim(obj, expr, options) {
    return _internal_1.trimString(obj, expr, options, { left: true, right: true });
}
exports.$trim = $trim;