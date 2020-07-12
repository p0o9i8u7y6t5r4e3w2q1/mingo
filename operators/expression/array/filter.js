"use strict";
// Array Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#array-expression-operators
Object.defineProperty(exports, "__esModule", { value: true });
exports.$filter = void 0;
const util_1 = require("../../../util");
const core_1 = require("../../../core");
/**
 * Selects a subset of the array to return an array with only the elements that match the filter condition.
 *
 * @param  {Object} obj  [description]
 * @param  {*} expr [description]
 * @return {*}      [description]
 */
function $filter(obj, expr, options) {
    let input = core_1.computeValue(obj, expr.input, null, options);
    let asVar = expr['as'];
    let condExpr = expr['cond'];
    util_1.assert(util_1.isArray(input), "$filter 'input' expression must resolve to an array");
    return input.filter((o) => {
        // inject variable
        let tempObj = {};
        tempObj['$' + asVar] = o;
        return core_1.computeValue(tempObj, condExpr, null, options) === true;
    });
}
exports.$filter = $filter;
