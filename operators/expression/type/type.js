"use strict";
/**
 * Type Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#type-expression-operators
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.$type = void 0;
const util_1 = require("../../../util");
const core_1 = require("../../../core");
function $type(obj, expr, options) {
    let val = core_1.computeValue(obj, expr, null, options);
    let typename = util_1.getType(val);
    let nativeType = typename.toLowerCase();
    switch (nativeType) {
        case util_1.JsType.BOOLEAN:
            return util_1.BsonType.BOOL;
        case util_1.JsType.NUMBER:
            if (val.toString().indexOf('.') >= 0)
                return util_1.BsonType.DOUBLE;
            return val >= util_1.MIN_INT && val <= util_1.MAX_INT ? util_1.BsonType.INT : util_1.BsonType.LONG;
        case util_1.JsType.REGEXP:
            return util_1.BsonType.REGEX;
        case util_1.JsType.STRING:
        case util_1.JsType.DATE:
        case util_1.JsType.ARRAY:
        case util_1.JsType.OBJECT:
        case util_1.JsType.FUNCTION:
        case util_1.JsType.NULL:
        case util_1.JsType.UNDEFINED:
            return nativeType;
        default:
            // unrecognized custom type
            return typename;
    }
}
exports.$type = $type;
