"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$project = void 0;
const util_1 = require("../../util");
const core_1 = require("../../core");
/**
 * Reshapes a document stream.
 * $project can rename, add, or remove fields as well as create computed values and sub-documents.
 *
 * @param collection
 * @param expr
 * @param opt
 * @returns {Array}
 */
function $project(collection, expr, options) {
    if (util_1.isEmpty(expr))
        return collection;
    // result collection
    let expressionKeys = util_1.keys(expr);
    let idOnlyExcluded = false;
    // validate inclusion and exclusion
    validateExpression(expr, options);
    const ID_KEY = options.config.idKey;
    if (util_1.inArray(expressionKeys, ID_KEY)) {
        let id = expr[ID_KEY];
        if (id === 0 || id === false) {
            expressionKeys = expressionKeys.filter(util_1.notInArray.bind(null, [ID_KEY]));
            idOnlyExcluded = expressionKeys.length == 0;
        }
    }
    else {
        // if not specified the add the ID field
        expressionKeys.push(ID_KEY);
    }
    return collection.map(obj => processObject(obj, expr, options, expressionKeys, idOnlyExcluded));
}
exports.$project = $project;
/**
 * Process the expression value for $project operators
 *
 * @param {Object} obj The object to use as options
 * @param {Object} expr The experssion object of $project operator
 * @param {Array} expressionKeys The key in the 'expr' object
 * @param {Boolean} idOnlyExcluded Boolean value indicating whether only the ID key is excluded
 */
function processObject(obj, expr, options, expressionKeys, idOnlyExcluded) {
    let newObj = new Object;
    let foundSlice = false;
    let foundExclusion = false;
    let dropKeys = [];
    const ID_KEY = options.config.idKey;
    if (idOnlyExcluded) {
        dropKeys.push(ID_KEY);
    }
    expressionKeys.forEach((key) => {
        // final computed value of the key
        let value = undefined;
        // expression to associate with key
        let subExpr = expr[key];
        if (key !== ID_KEY && util_1.inArray([0, false], subExpr)) {
            foundExclusion = true;
        }
        if (key === ID_KEY && util_1.isEmpty(subExpr)) {
            // tiny optimization here to skip over id
            value = obj[key];
        }
        else if (util_1.isString(subExpr)) {
            value = core_1.computeValue(obj, subExpr, key, options);
        }
        else if (util_1.inArray([1, true], subExpr)) {
            // For direct projections, we use the resolved object value
        }
        else if (subExpr instanceof Array) {
            value = subExpr.map(v => {
                let r = core_1.computeValue(obj, v, null, options);
                if (util_1.isNil(r))
                    return null;
                return r;
            });
        }
        else if (util_1.isObject(subExpr)) {
            let subExprKeys = util_1.keys(subExpr);
            let operator = subExprKeys.length == 1 ? subExprKeys[0] : null;
            // first try a projection operator
            let call = core_1.getOperator(core_1.OperatorType.PROJECTION, operator);
            if (call) {
                // apply the projection operator on the operator expression for the key
                if (operator === '$slice') {
                    // $slice is handled differently for aggregation and projection operations
                    if (util_1.ensureArray(subExpr[operator]).every(util_1.isNumber)) {
                        // $slice for projection operation
                        value = call(obj, subExpr[operator], key);
                        foundSlice = true;
                    }
                    else {
                        // $slice for aggregation operation
                        value = core_1.computeValue(obj, subExpr, key, options);
                    }
                }
                else {
                    value = call(obj, subExpr[operator], key, options);
                }
            }
            else if (util_1.isOperator(operator)) {
                // compute if operator key
                value = core_1.computeValue(obj, subExpr[operator], operator, options);
            }
            else if (util_1.has(obj, key)) {
                // compute the value for the sub expression for the key
                validateExpression(subExpr, options);
                let target = obj[key];
                if (target instanceof Array) {
                    value = target.map(o => processObject(o, subExpr, options, subExprKeys, false));
                }
                else {
                    target = util_1.isObject(target) ? target : obj;
                    value = processObject(target, subExpr, options, subExprKeys, false);
                }
            }
            else {
                // compute the value for the sub expression for the key
                value = core_1.computeValue(obj, subExpr, null, options);
            }
        }
        else {
            dropKeys.push(key);
            return;
        }
        // get value with object graph
        let objPathGraph = util_1.resolveGraph(obj, key, {
            preserveMissing: true
        });
        // add the value at the path
        if (objPathGraph !== undefined) {
            util_1.merge(newObj, objPathGraph, {
                flatten: true
            });
        }
        // if computed add/or remove accordingly
        if (util_1.notInArray([0, 1, false, true], subExpr)) {
            if (value === undefined) {
                util_1.removeValue(newObj, key);
            }
            else {
                util_1.setValue(newObj, key, value);
            }
        }
    });
    // filter out all missing values preserved to support correct merging
    util_1.filterMissing(newObj);
    // For the following cases we include all keys on the object that were not explicitly excluded.
    //
    // 1. projection included $slice operator
    // 2. some fields were explicitly excluded
    // 3. only the id field was excluded
    if (foundSlice || foundExclusion || idOnlyExcluded) {
        newObj = util_1.into({}, obj, newObj);
        if (dropKeys.length > 0) {
            newObj = util_1.cloneDeep(newObj);
            util_1.each(dropKeys, k => util_1.removeValue(newObj, k));
        }
    }
    return newObj;
}
/**
 * Validate inclusion and exclusion values in expression
 *
 * @param {Object} expr The expression given for the projection
 */
function validateExpression(expr, options) {
    let check = [false, false];
    util_1.each(expr, (v, k) => {
        if (k === options.config.idKey)
            return;
        if (v === 0 || v === false) {
            check[0] = true;
        }
        else if (v === 1 || v === true) {
            check[1] = true;
        }
        util_1.assert(!(check[0] && check[1]), 'Projection cannot have a mix of inclusion and exclusion.');
    });
}
