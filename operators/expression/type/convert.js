"use strict";
/**
 * Type Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#type-expression-operators
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.$convert = void 0;
const util_1 = require("../../../util");
const core_1 = require("../../../core");
const toString_1 = require("./toString");
const toBool_1 = require("./toBool");
const toDate_1 = require("./toDate");
const toDouble_1 = require("./toDouble");
const toInt_1 = require("./toInt");
const toLong_1 = require("./toLong");
const _internal_1 = require("./_internal");
/**
 * Converts a value to a specified type.
 *
 * @param obj
 * @param expr
 */
function $convert(obj, expr, options) {
    let args = core_1.computeValue(obj, expr, null, options);
    args.onNull = args.onNull === undefined ? null : args.onNull;
    if (util_1.isNil(args.input))
        return args.onNull;
    try {
        switch (args.to) {
            case 2:
            case util_1.JsType.STRING:
                return toString_1.$toString(obj, args.input, options);
            case 8:
            case util_1.JsType.BOOLEAN:
            case util_1.BsonType.BOOL:
                return toBool_1.$toBool(obj, args.input, options);
            case 9:
            case util_1.JsType.DATE:
                return toDate_1.$toDate(obj, args.input, options);
            case 1:
            case 19:
            case util_1.BsonType.DOUBLE:
            case util_1.BsonType.DECIMAL:
            case util_1.JsType.NUMBER:
                return toDouble_1.$toDouble(obj, args.input, options);
            case 16:
            case util_1.BsonType.INT:
                return toInt_1.$toInt(obj, args.input, options);
            case 18:
            case util_1.BsonType.LONG:
                return toLong_1.$toLong(obj, args.input, options);
        }
    }
    catch (e) { }
    if (args.onError !== undefined)
        return args.onError;
    throw new _internal_1.TypeConvertError(`could not convert to type ${args.to}.`);
}
exports.$convert = $convert;
