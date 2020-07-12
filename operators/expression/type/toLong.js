"use strict";
/**
 * Type Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#type-expression-operators
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.$toLong = void 0;
const _internal_1 = require("./_internal");
const util_1 = require("../../../util");
/**
 * Converts a value to a long. If the value cannot be converted to a long, $toLong errors. If the value is null or missing, $toLong returns null.
 * @param obj
 * @param expr
 */
function $toLong(obj, expr, options) {
    return _internal_1.toInteger(obj, expr, options, util_1.MAX_LONG, util_1.MIN_LONG, 'long');
}
exports.$toLong = $toLong;
