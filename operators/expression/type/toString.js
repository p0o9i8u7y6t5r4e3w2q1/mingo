"use strict";
/**
 * Type Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#type-expression-operators
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.$toString = void 0;
const core_1 = require("../../../core");
const date_1 = require("../date");
const util_1 = require("../../../util");
function $toString(obj, expr, options) {
    let val = core_1.computeValue(obj, expr, null, options);
    if (util_1.isNil(val))
        return null;
    if (val instanceof Date) {
        let dateExpr = {
            date: expr,
            format: "%Y-%m-%dT%H:%M:%S.%LZ"
        };
        return date_1.$dateToString(obj, dateExpr, options);
    }
    else {
        return val.toString();
    }
}
exports.$toString = $toString;
