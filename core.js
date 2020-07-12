"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.redact = exports.computeValue = exports.addOperators = exports.getOperator = exports.useOperators = exports.OperatorType = exports.createConfig = void 0;
const util_1 = require("./util");
/**
 * Creates a new default config
 */
function createConfig() {
    return { idKey: '_id' };
}
exports.createConfig = createConfig;
/**
 * The different groups of operators
 */
var OperatorType;
(function (OperatorType) {
    OperatorType["ACCUMULATOR"] = "accumulator";
    OperatorType["EXPRESSION"] = "expression";
    OperatorType["PIPELINE"] = "pipeline";
    OperatorType["PROJECTION"] = "projection";
    OperatorType["QUERY"] = "query";
})(OperatorType = exports.OperatorType || (exports.OperatorType = {}));
// operator definitions
const OPERATORS = {};
util_1.each(OperatorType, (cls) => {
    OPERATORS[cls] = {};
});
/**
 * Validates the object collection of operators
 */
function validateOperators(operators) {
    util_1.each(operators, (v, k) => {
        util_1.assert(v instanceof Function && util_1.isOperator(k), "invalid operator specified");
    });
}
/**
 * Register fully specified operators for the given operator class.
 *
 * @param cls Category of the operator
 * @param operators Name of operator
 */
function useOperators(cls, operators) {
    validateOperators(operators);
    util_1.into(OPERATORS[cls], operators);
}
exports.useOperators = useOperators;
/**
 * Returns the operator function or null if it is not found
 * @param cls Category of the operator
 * @param operator Name of the operator
 */
function getOperator(cls, operator) {
    return util_1.has(OPERATORS[cls], operator) ? OPERATORS[cls][operator] : null;
}
exports.getOperator = getOperator;
/**
 * Add new operators
 *
 * @param cls the operator class to extend
 * @param operatorFn a callback that accepts internal object state and returns an object of new operators.
 */
function addOperators(cls, operatorFn) {
    const newOperators = operatorFn({ computeValue, resolve: util_1.resolve });
    validateOperators(newOperators);
    // check for existing operators
    util_1.each(newOperators, (_, op) => {
        let call = getOperator(cls, op);
        util_1.assert(!call, `${op} already exists for '${cls}' operators`);
    });
    let wrapped = {};
    switch (cls) {
        case OperatorType.QUERY:
            util_1.each(newOperators, (fn, op) => {
                fn = fn.bind(newOperators);
                wrapped[op] = (selector, value, options) => (obj) => {
                    // value of field must be fully resolved.
                    let lhs = util_1.resolve(obj, selector, { unwrapArray: true });
                    return fn(selector, lhs, value, options);
                };
            });
            break;
        case OperatorType.PROJECTION:
            util_1.each(newOperators, (fn, op) => {
                fn = fn.bind(newOperators);
                wrapped[op] = (obj, expr, selector, options) => {
                    let lhs = util_1.resolve(obj, selector);
                    return fn(selector, lhs, expr, options);
                };
            });
            break;
        default:
            util_1.each(newOperators, (fn, op) => {
                wrapped[op] = (...args) => fn.apply(newOperators, args);
            });
    }
    // toss the operator salad :)
    useOperators(cls, wrapped);
}
exports.addOperators = addOperators;
/**
 * Implementation of system variables
 * @type {Object}
 */
const systemVariables = {
    '$$ROOT'(obj, expr, options) {
        return options.root;
    },
    '$$CURRENT'(obj, expr, options) {
        return obj;
    },
    '$$REMOVE'(obj, expr, options) {
        return undefined;
    }
};
/**
 * Implementation of $redact variables
 *
 * Each function accepts 3 arguments (obj, expr, opt)
 *
 * @type {Object}
 */
const redactVariables = {
    '$$KEEP'(obj, expr, options) {
        return obj;
    },
    '$$PRUNE'(obj, expr, options) {
        return undefined;
    },
    '$$DESCEND'(obj, expr, options) {
        // traverse nested documents iff there is a $cond
        if (!util_1.has(expr, '$cond'))
            return obj;
        let result;
        util_1.each(obj, (current, key) => {
            if (util_1.isObjectLike(current)) {
                if (util_1.isArray(current)) {
                    result = [];
                    util_1.each(current, (elem) => {
                        if (util_1.isObject(elem)) {
                            elem = redact(elem, expr, options);
                        }
                        if (!util_1.isNil(elem))
                            result.push(elem);
                    });
                }
                else {
                    result = redact(current, expr, options);
                }
                if (util_1.isNil(result)) {
                    delete obj[key]; // pruned result
                }
                else {
                    obj[key] = result;
                }
            }
        });
        return obj;
    }
};
/**
 * Computes the value of the expression on the object for the given operator
 *
 * @param obj the current object from the collection
 * @param expr the expression for the given field
 * @param operator the operator to resolve the field with
 * @param options {Object} extra options
 * @returns {*}
 */
function computeValue(obj, expr, operator, options) {
    // ensure valid options exist on first invocation
    options = options || { config: null };
    options.config = options.config || createConfig();
    if (util_1.isOperator(operator)) {
        // if the field of the object is a valid operator
        let call = getOperator(OperatorType.EXPRESSION, operator);
        if (call)
            return call(obj, expr, options);
        // we also handle $group accumulator operators
        call = getOperator(OperatorType.ACCUMULATOR, operator);
        if (call) {
            // if object is not an array, first try to compute using the expression
            if (!util_1.isArray(obj)) {
                obj = computeValue(obj, expr, null, options);
                expr = null;
            }
            // validate that we have an array
            util_1.assert(util_1.isArray(obj), `'${operator}' target must be an array.`);
            // we pass a null expression because all values have been resolved
            return call(obj, expr, options);
        }
        // operator was not found
        throw new Error(`operator '${operator}' is not registered`);
    }
    // if expr is a variable for an object field
    // field not used in this case
    if (util_1.isString(expr) && expr.length > 0 && expr[0] === '$') {
        // we return redact variables as literals
        if (util_1.has(redactVariables, expr)) {
            return expr;
        }
        // handle selectors with explicit prefix
        let arr = expr.split('.');
        if (util_1.has(systemVariables, arr[0])) {
            // set 'root' only the first time it is required to be used for all subsequent calls
            // if it already available on the options, it will be used
            obj = systemVariables[arr[0]](obj, null, util_1.into({ root: obj }, options));
            if (arr.length == 1)
                return obj;
            expr = expr.substr(arr[0].length); // '.' prefix will be sliced off below
        }
        return util_1.resolve(obj, expr.slice(1));
    }
    // check and return value if already in a resolved state
    if (util_1.isArray(expr)) {
        return expr.map((item) => computeValue(obj, item, null, options));
    }
    else if (util_1.isObject(expr)) {
        let result = {};
        util_1.each(expr, (val, key) => {
            result[key] = computeValue(obj, val, key, options);
            // must run ONLY one aggregate operator per expression
            // if so, return result of the computed value
            if ([OperatorType.EXPRESSION, OperatorType.ACCUMULATOR].some(c => util_1.has(OPERATORS[c], key))) {
                // there should be only one operator
                util_1.assert(util_1.keys(expr).length === 1, "Invalid aggregation expression '" + JSON.stringify(expr) + "'");
                result = result[key];
                return false; // break
            }
        });
        return result;
    }
    else {
        return expr;
    }
}
exports.computeValue = computeValue;
/**
 * Redact an object
 * @param  {Object} obj The object to redact
 * @param  {*} expr The redact expression
 * @param  {*} options  Options for value
 * @return {*} returns the result of the redacted object
 */
function redact(obj, expr, options) {
    let result = computeValue(obj, expr, null, options);
    return util_1.has(redactVariables, result)
        ? redactVariables[result](obj, expr, util_1.into({ root: obj }, options))
        : result;
}
exports.redact = redact;
