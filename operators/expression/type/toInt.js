"use strict";
/**
 * Type Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#type-expression-operators
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.$toInt = void 0;
const _internal_1 = require("./_internal");
const util_1 = require("../../../util");
/**
 * Converts a value to an integer. If the value cannot be converted to an integer, $toInt errors. If the value is null or missing, $toInt returns null.
 * @param obj
 * @param expr
 */
function $toInt(obj, expr, options) {
    return _internal_1.toInteger(obj, expr, options, util_1.MAX_INT, util_1.MIN_INT, 'int');
}
exports.$toInt = $toInt;
