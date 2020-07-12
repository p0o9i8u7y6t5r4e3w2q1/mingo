"use strict";
/**
 * Utility constants and functions
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalize = exports.isOperator = exports.removeValue = exports.setValue = exports.traverse = exports.filterMissing = exports.resolveGraph = exports.resolve = exports.memoize = exports.into = exports.groupBy = exports.sortBy = exports.compare = exports.hashCode = exports.unique = exports.isEqual = exports.flatten = exports.union = exports.intersection = exports.merge = exports.objectMap = exports.each = exports.keys = exports.has = exports.ensureArray = exports.isEmpty = exports.truthy = exports.notInArray = exports.inArray = exports.isUndefined = exports.isNull = exports.isNil = exports.isFunction = exports.isRegExp = exports.isDate = exports.isObjectLike = exports.isObject = exports.isArray = exports.isNumber = exports.isString = exports.isBoolean = exports.getType = exports.cloneDeep = exports.assert = exports.BsonType = exports.JsType = exports.MIN_LONG = exports.MAX_LONG = exports.MIN_INT = exports.MAX_INT = void 0;
exports.MAX_INT = 2147483647;
exports.MIN_INT = -2147483648;
exports.MAX_LONG = Number.MAX_SAFE_INTEGER;
exports.MIN_LONG = Number.MIN_SAFE_INTEGER;
// special value to identify missing items. treated differently from undefined
const MISSING = () => { };
// Javascript native types
var JsType;
(function (JsType) {
    JsType["NULL"] = "null";
    JsType["UNDEFINED"] = "undefined";
    JsType["BOOLEAN"] = "boolean";
    JsType["NUMBER"] = "number";
    JsType["STRING"] = "string";
    JsType["DATE"] = "date";
    JsType["REGEXP"] = "regexp";
    JsType["ARRAY"] = "array";
    JsType["OBJECT"] = "object";
    JsType["FUNCTION"] = "function";
})(JsType = exports.JsType || (exports.JsType = {}));
// MongoDB BSON types
var BsonType;
(function (BsonType) {
    BsonType["BOOL"] = "bool";
    BsonType["INT"] = "int";
    BsonType["LONG"] = "long";
    BsonType["DOUBLE"] = "double";
    BsonType["DECIMAL"] = "decimal";
    BsonType["REGEX"] = "regex";
})(BsonType = exports.BsonType || (exports.BsonType = {}));
// no array, object, or function types
const JS_SIMPLE_TYPES = [JsType.NULL, JsType.UNDEFINED, JsType.BOOLEAN, JsType.NUMBER, JsType.STRING, JsType.DATE, JsType.REGEXP];
function assert(condition, message) {
    if (!condition)
        throw new Error(message);
}
exports.assert = assert;
/**
 * Deep clone an object
 */
function cloneDeep(obj) {
    if (exports.isArray(obj))
        return obj.map(cloneDeep);
    if (isDate(obj))
        return new Date(obj);
    if (isObject(obj))
        return objectMap(obj, cloneDeep);
    return obj;
}
exports.cloneDeep = cloneDeep;
/**
 * Returns the name of type of value given by its constructor.
 * If missing returns "null" or "undefined" their respective values.
 * @param v A value
 */
function getType(v) {
    if (v === null)
        return 'null';
    if (v === undefined)
        return 'undefined';
    return v.constructor.name;
}
exports.getType = getType;
function isBoolean(v) { return typeof v === JsType.BOOLEAN; }
exports.isBoolean = isBoolean;
function isString(v) { return typeof v === JsType.STRING; }
exports.isString = isString;
function isNumber(v) { return !isNaN(v) && typeof v === JsType.NUMBER; }
exports.isNumber = isNumber;
exports.isArray = Array.isArray || (v => v instanceof Array);
function isObject(v) { return !!v && v.constructor === Object; }
exports.isObject = isObject;
function isObjectLike(v) { return v === Object(v); } // objects, arrays, functions, date, custom object
exports.isObjectLike = isObjectLike;
function isDate(v) { return v instanceof Date; }
exports.isDate = isDate;
function isRegExp(v) { return v instanceof RegExp; }
exports.isRegExp = isRegExp;
function isFunction(v) { return typeof v === JsType.FUNCTION; }
exports.isFunction = isFunction;
function isNil(v) { return v === null || v === undefined; }
exports.isNil = isNil;
function isNull(v) { return v === null; }
exports.isNull = isNull;
function isUndefined(v) { return v === undefined; }
exports.isUndefined = isUndefined;
exports.inArray = (() => {
    // if Array.includes is not supported
    if (!Array.prototype.includes) {
        return (arr, item) => isNaN(item) && !isString(item) ? arr.some(v => isNaN(v) && !isString(v)) : arr.indexOf(item) > -1;
    }
    // default
    return (arr, item) => arr.includes(item);
})();
function notInArray(arr, item) { return !exports.inArray(arr, item); }
exports.notInArray = notInArray;
function truthy(arg) { return !!arg; }
exports.truthy = truthy;
function isEmpty(x) {
    return isNil(x) ||
        exports.isArray(x) && x.length === 0 ||
        isObject(x) && exports.keys(x).length === 0 || !x;
}
exports.isEmpty = isEmpty;
// ensure a value is an array or wrapped within one
function ensureArray(x) { return x instanceof Array ? x : [x]; }
exports.ensureArray = ensureArray;
function has(obj, prop) { return !!obj && obj.hasOwnProperty(prop); }
exports.has = has;
exports.keys = Object.keys;
/**
 * Iterate over an array or object
 * @param  {Array|Object} obj An object-like value
 * @param  {Function} fn The callback to run per item
 * @param  {*}   ctx  The object to use a context
 * @return {void}
 */
function each(obj, fn) {
    if (obj instanceof Array) {
        let arr = obj;
        for (let i = 0, len = arr.length; i < len; i++) {
            if (fn(arr[i], i) === false)
                break;
        }
    }
    else {
        let arr = exports.keys(obj);
        for (let i = 0, len = arr.length; i < len; i++) {
            fn(obj[arr[i]], arr[i]);
        }
    }
}
exports.each = each;
/**
 * Transform values in an object
 *
 * @param  {Object}   obj   An object whose values to transform
 * @param  {Function} fn The transform function
 * @return {Array|Object} Result object after applying the transform
 */
function objectMap(obj, fn) {
    let o = {};
    let objKeys = exports.keys(obj);
    for (let i = 0; i < objKeys.length; i++) {
        let k = objKeys[i];
        o[k] = fn(obj[k], k);
    }
    return o;
}
exports.objectMap = objectMap;
/**
 * Deep merge objects or arrays.
 * When the inputs have unmergeable types, the source value (right hand side) is returned.
 * If inputs are arrays of same length and all elements are mergable, elements in the same position are merged together.
 * If any of the elements are unmergeable, elements in the source are appended to the target.
 * @param target {Object|Array} the target to merge into
 * @param obj {Object|Array} the source object
 */
function merge(target, obj, options) {
    // take care of missing inputs
    if (target === MISSING)
        return obj;
    if (obj === MISSING)
        return target;
    const inputs = [target, obj];
    if (!(inputs.every(isObject) || inputs.every(exports.isArray))) {
        throw Error('mismatched types. must both be array or object');
    }
    // default options
    options = options || { flatten: false };
    if (exports.isArray(target)) {
        let result = target;
        let input = obj;
        if (options.flatten) {
            let i = 0;
            let j = 0;
            while (i < result.length && j < input.length) {
                result[i] = merge(result[i++], input[j++], options);
            }
            while (j < input.length) {
                result.push(obj[j++]);
            }
        }
        else {
            Array.prototype.push.apply(result, input);
        }
    }
    else {
        Object.keys(obj).forEach((k) => {
            if (has(target, k)) {
                target[k] = merge(target[k], obj[k], options);
            }
            else {
                target[k] = obj[k];
            }
        });
    }
    return target;
}
exports.merge = merge;
/**
 * Returns the intersection between two arrays
 *
 * @param  {Array} xs The first array
 * @param  {Array} ys The second array
 * @return {Array}    Result array
 */
function intersection(a, b) {
    let flipped = false;
    // we ensure the left array is always smallest
    if (a.length > b.length) {
        let t = a;
        a = b;
        b = t;
        flipped = true;
    }
    let maxSize = Math.max(a.length, b.length);
    let maxResult = Math.min(a.length, b.length);
    let lookup = a.reduce((memo, v, i) => {
        memo[hashCode(v)] = i;
        return memo;
    }, {});
    let indexes = [];
    for (let i = 0, j = 0; i < maxSize && j < maxResult; i++) {
        let k = lookup[hashCode(b[i])];
        if (k !== undefined) {
            indexes.push(k);
            j++;
        }
    }
    // unless we flipped the arguments we must sort the indexes to keep stability
    if (!flipped)
        indexes.sort();
    return indexes.map(i => a[i]);
}
exports.intersection = intersection;
/**
 * Returns the union of two arrays
 *
 * @param  {Array} xs The first array
 * @param  {Array} ys The second array
 * @return {Array}   The result array
 */
function union(xs, ys) {
    return into(into([], xs), ys.filter(notInArray.bind(null, xs)));
}
exports.union = union;
/**
 * Flatten the array
 *
 * @param  {Array} xs The array to flatten
 * @param {Number} depth The number of nested lists to iterate
 */
function flatten(xs, depth) {
    let arr = [];
    function flatten2(ys, n) {
        for (let i = 0, len = ys.length; i < len; i++) {
            if (exports.isArray(ys[i]) && (n > 0 || n < 0)) {
                flatten2(ys[i], Math.max(-1, n - 1));
            }
            else {
                arr.push(ys[i]);
            }
        }
    }
    flatten2(xs, depth);
    return arr;
}
exports.flatten = flatten;
/**
 * Determine whether two values are the same or strictly equivalent
 *
 * @param  {*}  a The first value
 * @param  {*}  b The second value
 * @return {Boolean}   Result of comparison
 */
function isEqual(a, b) {
    let lhs = [a];
    let rhs = [b];
    while (lhs.length > 0) {
        a = lhs.pop();
        b = rhs.pop();
        // strictly equal must be equal.
        if (a === b)
            continue;
        // unequal types and functions cannot be equal.
        let nativeType = getType(a).toLowerCase();
        if (nativeType !== getType(b).toLowerCase() || nativeType === JsType.FUNCTION)
            return false;
        // leverage toString for Date and RegExp types
        switch (nativeType) {
            case JsType.ARRAY:
                if (a.length !== b.length)
                    return false;
                if (a.length === b.length && a.length === 0)
                    continue;
                into(lhs, a);
                into(rhs, b);
                break;
            case JsType.OBJECT:
                // deep compare objects
                let ka = exports.keys(a);
                let kb = exports.keys(b);
                // check length of keys early
                if (ka.length !== kb.length)
                    return false;
                // we know keys are strings so we sort before comparing
                ka.sort();
                kb.sort();
                // compare keys
                for (let i = 0, len = ka.length; i < len; i++) {
                    let tempKey = ka[i];
                    if (tempKey !== kb[i]) {
                        return false;
                    }
                    else {
                        // save later work
                        lhs.push(a[tempKey]);
                        rhs.push(b[tempKey]);
                    }
                }
                break;
            default:
                // compare encoded values
                if (encode(a) !== encode(b))
                    return false;
        }
    }
    return lhs.length === 0;
}
exports.isEqual = isEqual;
/**
 * Return a new unique version of the collection
 * @param  {Array} xs The input collection
 * @return {Array}    A new collection with unique values
 */
function unique(xs) {
    let h = {};
    let arr = [];
    each(xs, item => {
        let k = hashCode(item);
        if (!has(h, k)) {
            arr.push(item);
            h[k] = 0;
        }
    });
    return arr;
}
exports.unique = unique;
/**
 * Encode value to string using a simple non-colliding stable scheme.
 *
 * @param value
 * @returns {*}
 */
function encode(value) {
    let type = getType(value).toLowerCase();
    switch (type) {
        case JsType.BOOLEAN:
        case JsType.NUMBER:
        case JsType.REGEXP:
            return value.toString();
        case JsType.STRING:
            return JSON.stringify(value);
        case JsType.DATE:
            return value.toISOString();
        case JsType.NULL:
        case JsType.UNDEFINED:
            return type;
        case JsType.ARRAY:
            return '[' + value.map(encode) + ']';
        default:
            let prefix = (type === JsType.OBJECT) ? '' : `${getType(value)}`;
            let objKeys = exports.keys(value);
            objKeys.sort();
            return `${prefix}{` + objKeys.map(k => `${encode(k)}:${encode(value[k])}`) + '}';
    }
}
/**
 * Generate hash code
 * This selected function is the result of benchmarking various hash functions.
 * This version performs well and can hash 10^6 documents in ~3s with on average 100 collisions.
 *
 * @param value
 * @returns {number|null}
 */
function hashCode(value) {
    if (isNil(value))
        return null;
    let hash = 0;
    let s = encode(value);
    let i = s.length;
    while (i)
        hash = ((hash << 5) - hash) ^ s.charCodeAt(--i);
    return hash >>> 0;
}
exports.hashCode = hashCode;
/**
 * Default compare function
 * @param {*} a
 * @param {*} b
 */
function compare(a, b) {
    if (a < b)
        return -1;
    if (a > b)
        return 1;
    return 0;
}
exports.compare = compare;
/**
 * Returns a (stably) sorted copy of list, ranked in ascending order by the results of running each value through iteratee
 *
 * This implementation treats null/undefined sort keys as less than every other type
 *
 * @param {Array}   collection
 * @param {Function} keyFn The sort key function used to resolve sort keys
 * @param {Function} comparator The comparator function to use for comparing keys. Defaults to standard comparison via `compare(...)`
 * @return {Array} Returns a new sorted array by the given key and comparator function
 */
function sortBy(collection, keyFn, comparator) {
    let sorted = [];
    let result = [];
    let hash = {};
    comparator = comparator || compare;
    if (isEmpty(collection))
        return collection;
    for (let i = 0; i < collection.length; i++) {
        let obj = collection[i];
        let key = keyFn(obj, i);
        // objects with nil keys will go in first
        if (isNil(key)) {
            result.push(obj);
        }
        else {
            // null suffix to differentiate string keys from native object properties
            if (isString(key))
                key += '\0';
            if (hash[key]) {
                hash[key].push(obj);
            }
            else {
                hash[key] = [obj];
            }
            sorted.push(key);
        }
    }
    // use native array sorting but enforce stableness
    sorted.sort(comparator);
    for (let i = 0; i < sorted.length; i++) {
        into(result, hash[sorted[i]]);
    }
    return result;
}
exports.sortBy = sortBy;
/**
 * Groups the collection into sets by the returned key
 *
 * @param collection
 * @param keyFn {Function} to compute the group key of an item in the collection
 * @returns {{keys: Array, groups: Array}}
 */
function groupBy(collection, keyFn) {
    let result = {
        keys: [],
        groups: []
    };
    let lookup = {};
    each(collection, obj => {
        let key = keyFn(obj);
        let hash = hashCode(key);
        let index = -1;
        if (lookup[hash] === undefined) {
            index = result.keys.length;
            lookup[hash] = index;
            result.keys.push(key);
            result.groups.push([]);
        }
        index = lookup[hash];
        result.groups[index].push(obj);
    });
    return result;
}
exports.groupBy = groupBy;
// max elements to push.
// See argument limit https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply
const MAX_ARRAY_PUSH = 50000;
/**
 * Merge elements into the dest
 *
 * @param {*} target The target object
 * @param {*} rest The array of elements to merge into dest
 */
function into(target, ...rest) {
    if (target instanceof Array) {
        return rest.reduce((acc, arr) => {
            // push arrary in batches to handle large inputs
            let i = Math.ceil(arr.length / MAX_ARRAY_PUSH);
            let begin = 0;
            while (i-- > 0) {
                Array.prototype.push.apply(acc, arr.slice(begin, begin + MAX_ARRAY_PUSH));
                begin += MAX_ARRAY_PUSH;
            }
            return acc;
        }, target);
    }
    else if (isObject(target)) {
        // merge objects. same behaviour as Object.assign
        return rest.filter(isObjectLike).reduce((acc, item) => {
            each(item, (v, k) => acc[k] = v);
            return acc;
        }, target);
    }
    return null;
}
exports.into = into;
/**
 * This is a generic memoization function
 *
 * This implementation uses a cache independent of the function being memoized
 * to allow old values to be garbage collected when the memoized function goes out of scope.
 *
 * @param {*} fn The function object to memoize
 */
function memoize(fn) {
    return ((memo) => {
        return (...args) => {
            let key = hashCode(args);
            if (!has(memo, key)) {
                memo[key] = fn.apply(this, args);
            }
            return memo[key];
        };
    })({ /* storage */});
}
exports.memoize = memoize;
// mingo internal
/**
 * Retrieve the value of a given key on an object
 * @param obj
 * @param field
 * @returns {*}
 * @private
 */
function getValue(obj, field) {
    return isObjectLike(obj) ? obj[field] : undefined;
}
/**
 * Unwrap a single element array to specified depth
 * @param {Array} arr
 * @param {Number} depth
 */
function unwrap(arr, depth) {
    if (depth < 1)
        return arr;
    while (depth-- && arr.length === 1)
        arr = arr[0];
    return arr;
}
/**
 * Resolve the value of the field (dot separated) on the given object
 * @param obj {Object} the object context
 * @param selector {String} dot separated path to field
 * @returns {*}
 */
function resolve(obj, selector, options) {
    let depth = 0;
    // options
    options = options || { unwrapArray: false };
    function resolve2(o, path) {
        let value = o;
        for (let i = 0; i < path.length; i++) {
            let field = path[i];
            let isText = field.match(/^\d+$/) === null;
            // using instanceof to aid typescript compiler
            if (isText && value instanceof Array) {
                // On the first iteration, we check if we received a stop flag.
                // If so, we stop to prevent iterating over a nested array value
                // on consecutive object keys in the selector.
                if (i === 0 && depth > 0)
                    break;
                depth += 1;
                // only look at the rest of the path
                let subpath = path.slice(i);
                value = value.reduce((acc, item) => {
                    let v = resolve2(item, subpath);
                    if (v !== undefined)
                        acc.push(v);
                    return acc;
                }, []);
                break;
            }
            else {
                value = getValue(value, field);
            }
            if (value === undefined)
                break;
        }
        return value;
    }
    obj = exports.inArray(JS_SIMPLE_TYPES, getType(obj).toLowerCase()) ? obj : resolve2(obj, selector.split('.'));
    return obj instanceof Array && options.unwrapArray ? unwrap(obj, depth) : obj;
}
exports.resolve = resolve;
/**
 * Returns the full object to the resolved value given by the selector.
 * This function excludes empty values as they aren't practically useful.
 *
 * @param obj {Object} the object context
 * @param selector {String} dot separated path to field
 */
function resolveGraph(obj, selector, options) {
    // options
    if (options === undefined) {
        options = { preserveMissing: false };
    }
    let names = selector.split('.');
    let key = names[0];
    // get the next part of the selector
    let next = names.slice(1).join('.');
    let isIndex = key.match(/^\d+$/) !== null;
    let hasNext = names.length > 1;
    let result;
    let value;
    if (obj instanceof Array) {
        if (isIndex) {
            result = getValue(obj, Number(key));
            if (hasNext) {
                result = resolveGraph(result, next, options);
            }
            result = [result];
        }
        else {
            result = [];
            each(obj, item => {
                value = resolveGraph(item, selector, options);
                if (options.preserveMissing) {
                    if (value === undefined) {
                        value = MISSING;
                    }
                    result.push(value);
                }
                else if (value !== undefined) {
                    result.push(value);
                }
            });
        }
    }
    else {
        value = getValue(obj, key);
        if (hasNext) {
            value = resolveGraph(value, next, options);
        }
        if (value === undefined)
            return undefined;
        result = {};
        result[key] = value;
    }
    return result;
}
exports.resolveGraph = resolveGraph;
/**
 * Filter out all MISSING values from the object in-place
 *
 * @param obj The object to filter
 */
function filterMissing(obj) {
    if (obj instanceof Array) {
        for (let i = obj.length - 1; i >= 0; i--) {
            if (obj[i] === MISSING) {
                obj.splice(i, 1);
            }
            else {
                filterMissing(obj[i]);
            }
        }
    }
    else if (isObject(obj)) {
        for (let k in obj) {
            if (has(obj, k)) {
                filterMissing(obj[k]);
            }
        }
    }
    return obj;
}
exports.filterMissing = filterMissing;
/**
 * Walk the object graph and execute the given transform function
 *
 * @param  {Object|Array} obj   The object to traverse
 * @param  {String} selector    The selector
 * @param  {Function} fn Function to execute for value at the end the traversal
 * @param  {Boolean} force Force generating missing parts of object graph
 * @return {*}
 */
function traverse(obj, selector, fn, force) {
    let names = selector.split('.');
    let key = names[0];
    let next = names.slice(1).join('.');
    if (names.length === 1) {
        fn(obj, key);
    }
    else {
        // force the rest of the graph while traversing
        if (force === true && isNil(obj[key])) {
            obj[key] = {};
        }
        traverse(obj[key], next, fn, force);
    }
}
exports.traverse = traverse;
/**
 * Set the value of the given object field
 *
 * @param obj {Object|Array} the object context
 * @param selector {String} path to field
 * @param value {*} the value to set
 */
function setValue(obj, selector, value) {
    traverse(obj, selector, (item, key) => {
        item[key] = value;
    }, true);
}
exports.setValue = setValue;
function removeValue(obj, selector) {
    traverse(obj, selector, (item, key) => {
        if (item instanceof Array && /^\d+$/.test(key)) {
            item.splice(parseInt(key), 1);
        }
        else if (isObject(item)) {
            delete item[key];
        }
    });
}
exports.removeValue = removeValue;
const OPERATOR_NAME_PATTERN = /^\$[a-zA-Z0-9_]+$/;
/**
 * Check whether the given name passes for an operator. We assume any field name starting with '$' is an operator.
 * This is cheap and safe to do since keys beginning with '$' should be reserved for internal use.
 * @param {String} name
 */
function isOperator(name) {
    return OPERATOR_NAME_PATTERN.test(name);
}
exports.isOperator = isOperator;
/**
 * Simplify expression for easy evaluation with query operators map
 * @param expr
 * @returns {*}
 */
function normalize(expr) {
    // normalized primitives
    if (exports.inArray(JS_SIMPLE_TYPES, getType(expr).toLowerCase())) {
        return isRegExp(expr) ? { '$regex': expr } : { '$eq': expr };
    }
    // normalize object expression. using ObjectLike handles custom types
    if (isObjectLike(expr)) {
        // no valid query operator found, so we do simple comparison
        if (!exports.keys(expr).some(isOperator)) {
            return { '$eq': expr };
        }
        // ensure valid regex
        if (has(expr, '$regex')) {
            expr['$regex'] = new RegExp(expr['$regex'], expr['$options']);
            delete expr['$options'];
        }
    }
    return expr;
}
exports.normalize = normalize;
