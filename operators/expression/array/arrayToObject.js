"use strict";
// Array Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#array-expression-operators
Object.defineProperty(exports, "__esModule", { value: true });
exports.$arrayToObject = void 0;
const util_1 = require("../../../util");
const core_1 = require("../../../core");
/**
 * Converts an array of key value pairs to a document.
 */
function $arrayToObject(obj, expr, options) {
    let arr = core_1.computeValue(obj, expr, null, options);
    util_1.assert(util_1.isArray(arr), '$arrayToObject expression must resolve to an array');
    return arr.reduce((newObj, val) => {
        if (util_1.isArray(val) && val.length == 2) {
            newObj[val[0]] = val[1];
        }
        else {
            util_1.assert(util_1.isObject(val) && util_1.has(val, 'k') && util_1.has(val, 'v'), '$arrayToObject expression is invalid.');
            newObj[val.k] = val.v;
        }
        return newObj;
    }, {});
}
exports.$arrayToObject = $arrayToObject;
