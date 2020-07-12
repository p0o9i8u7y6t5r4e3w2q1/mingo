"use strict";
/**
 * String Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#string-expression-operators
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.$toLower = void 0;
const util_1 = require("../../../util");
const core_1 = require("../../../core");
/**
 * Converts a string to lowercase.
 *
 * @param obj
 * @param expr
 * @returns {string}
 */
function $toLower(obj, expr, options) {
    let value = core_1.computeValue(obj, expr, null, options);
    return util_1.isEmpty(value) ? '' : value.toLowerCase();
}
exports.$toLower = $toLower;