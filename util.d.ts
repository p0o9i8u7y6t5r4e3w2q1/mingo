/**
 * Utility constants and functions
 */
export declare const MAX_INT = 2147483647;
export declare const MIN_INT = -2147483648;
export declare const MAX_LONG: number;
export declare const MIN_LONG: number;
export declare enum JsType {
    NULL = "null",
    UNDEFINED = "undefined",
    BOOLEAN = "boolean",
    NUMBER = "number",
    STRING = "string",
    DATE = "date",
    REGEXP = "regexp",
    ARRAY = "array",
    OBJECT = "object",
    FUNCTION = "function"
}
export declare enum BsonType {
    BOOL = "bool",
    INT = "int",
    LONG = "long",
    DOUBLE = "double",
    DECIMAL = "decimal",
    REGEX = "regex"
}
export interface Callback<T> {
    (...args: any): T;
}
export interface Predicate<T> {
    (...args: T[]): boolean;
}
declare type CompareResult = -1 | 0 | 1;
export interface Comparator<T> {
    (left: T, right: T): CompareResult;
}
interface ResolveOptions {
    unwrapArray?: boolean;
    preserveMissing?: boolean;
}
export declare function assert(condition: boolean, message: string): void;
/**
 * Deep clone an object
 */
export declare function cloneDeep(obj: any): any;
/**
 * Returns the name of type of value given by its constructor.
 * If missing returns "null" or "undefined" their respective values.
 * @param v A value
 */
export declare function getType(v: any): string;
export declare function isBoolean(v: any): v is boolean;
export declare function isString(v: any): v is string;
export declare function isNumber(v: any): v is number;
export declare const isArray: (v: any) => boolean;
export declare function isObject(v: any): boolean;
export declare function isObjectLike(v: any): boolean;
export declare function isDate(v: any): boolean;
export declare function isRegExp(v: any): boolean;
export declare function isFunction(v: any): boolean;
export declare function isNil(v: any): boolean;
export declare function isNull(v: any): boolean;
export declare function isUndefined(v: any): boolean;
export declare const inArray: (arr: any[], item: any) => boolean;
export declare function notInArray(arr: any[], item: any): boolean;
export declare function truthy(arg: any): boolean;
export declare function isEmpty(x: any): boolean;
export declare function ensureArray(x: any): any[];
export declare function has(obj: object, prop: any): boolean;
export declare const keys: {
    (o: object): string[];
    (o: {}): string[];
};
/**
 * Iterate over an array or object
 * @param  {Array|Object} obj An object-like value
 * @param  {Function} fn The callback to run per item
 * @param  {*}   ctx  The object to use a context
 * @return {void}
 */
export declare function each(obj: object, fn: Callback<any>): void;
/**
 * Transform values in an object
 *
 * @param  {Object}   obj   An object whose values to transform
 * @param  {Function} fn The transform function
 * @return {Array|Object} Result object after applying the transform
 */
export declare function objectMap(obj: object, fn: Callback<any>): object;
interface MergeOptions {
    flatten?: boolean;
}
/**
 * Deep merge objects or arrays.
 * When the inputs have unmergeable types, the source value (right hand side) is returned.
 * If inputs are arrays of same length and all elements are mergable, elements in the same position are merged together.
 * If any of the elements are unmergeable, elements in the source are appended to the target.
 * @param target {Object|Array} the target to merge into
 * @param obj {Object|Array} the source object
 */
export declare function merge(target: object, obj: object, options?: MergeOptions): object;
/**
 * Returns the intersection between two arrays
 *
 * @param  {Array} xs The first array
 * @param  {Array} ys The second array
 * @return {Array}    Result array
 */
export declare function intersection(a: any[], b: any[]): any[];
/**
 * Returns the union of two arrays
 *
 * @param  {Array} xs The first array
 * @param  {Array} ys The second array
 * @return {Array}   The result array
 */
export declare function union(xs: any[], ys: any[]): any[];
/**
 * Flatten the array
 *
 * @param  {Array} xs The array to flatten
 * @param {Number} depth The number of nested lists to iterate
 */
export declare function flatten(xs: any[], depth: number): any[];
/**
 * Determine whether two values are the same or strictly equivalent
 *
 * @param  {*}  a The first value
 * @param  {*}  b The second value
 * @return {Boolean}   Result of comparison
 */
export declare function isEqual(a: any, b: any): boolean;
/**
 * Return a new unique version of the collection
 * @param  {Array} xs The input collection
 * @return {Array}    A new collection with unique values
 */
export declare function unique(xs: any[]): any[];
/**
 * Generate hash code
 * This selected function is the result of benchmarking various hash functions.
 * This version performs well and can hash 10^6 documents in ~3s with on average 100 collisions.
 *
 * @param value
 * @returns {number|null}
 */
export declare function hashCode(value: any): number | null;
/**
 * Default compare function
 * @param {*} a
 * @param {*} b
 */
export declare function compare(a: any, b: any): CompareResult;
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
export declare function sortBy(collection: any[], keyFn: Callback<any>, comparator?: Comparator<any>): any[];
/**
 * Groups the collection into sets by the returned key
 *
 * @param collection
 * @param keyFn {Function} to compute the group key of an item in the collection
 * @returns {{keys: Array, groups: Array}}
 */
export declare function groupBy(collection: any[], keyFn: Callback<any>): {
    keys: any[];
    groups: any[];
};
/**
 * Merge elements into the dest
 *
 * @param {*} target The target object
 * @param {*} rest The array of elements to merge into dest
 */
export declare function into(target: any, ...rest: any[]): any;
/**
 * This is a generic memoization function
 *
 * This implementation uses a cache independent of the function being memoized
 * to allow old values to be garbage collected when the memoized function goes out of scope.
 *
 * @param {*} fn The function object to memoize
 */
export declare function memoize(fn: Callback<any>): Callback<any>;
/**
 * Resolve the value of the field (dot separated) on the given object
 * @param obj {Object} the object context
 * @param selector {String} dot separated path to field
 * @returns {*}
 */
export declare function resolve(obj: object | any[], selector: string, options?: ResolveOptions): any;
/**
 * Returns the full object to the resolved value given by the selector.
 * This function excludes empty values as they aren't practically useful.
 *
 * @param obj {Object} the object context
 * @param selector {String} dot separated path to field
 */
export declare function resolveGraph(obj: object, selector: string, options?: ResolveOptions): any;
/**
 * Filter out all MISSING values from the object in-place
 *
 * @param obj The object to filter
 */
export declare function filterMissing(obj: object): object;
/**
 * Walk the object graph and execute the given transform function
 *
 * @param  {Object|Array} obj   The object to traverse
 * @param  {String} selector    The selector
 * @param  {Function} fn Function to execute for value at the end the traversal
 * @param  {Boolean} force Force generating missing parts of object graph
 * @return {*}
 */
export declare function traverse(obj: object, selector: string, fn: Callback<void>, force?: boolean): void;
/**
 * Set the value of the given object field
 *
 * @param obj {Object|Array} the object context
 * @param selector {String} path to field
 * @param value {*} the value to set
 */
export declare function setValue(obj: object, selector: string, value: any): void;
export declare function removeValue(obj: any, selector: any): void;
/**
 * Check whether the given name passes for an operator. We assume any field name starting with '$' is an operator.
 * This is cheap and safe to do since keys beginning with '$' should be reserved for internal use.
 * @param {String} name
 */
export declare function isOperator(name: string): boolean;
/**
 * Simplify expression for easy evaluation with query operators map
 * @param expr
 * @returns {*}
 */
export declare function normalize(expr: any): any;
export {};
