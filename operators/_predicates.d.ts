/**
 * Predicates used for Query and Expression operators.
 */
import { Predicate, Callback } from '../util';
import { Options } from '../core';
/**
 * Returns a query operator created from the predicate
 *
 * @param pred Predicate function
 */
export declare function createQueryOperator(pred: Predicate<any>): Callback<any>;
/**
 * Returns an expression operator created from the predicate
 *
 * @param f Predicate function
 */
export declare function createExpressionOperator(f: Predicate<any>): (obj: object, expr: any, options: Options) => boolean;
/**
 * Checks that two values are equal.
 *
 * @param a         The lhs operand as resolved from the object by the given selector
 * @param b         The rhs operand provided by the user
 * @returns {*}
 */
export declare function $eq(a: any, b: any): boolean;
/**
 * Matches all values that are not equal to the value specified in the query.
 *
 * @param a
 * @param b
 * @returns {boolean}
 */
export declare function $ne(a: any, b: any): boolean;
/**
 * Matches any of the values that exist in an array specified in the query.
 *
 * @param a
 * @param b
 * @returns {*}
 */
export declare function $in(a: any, b: any): boolean;
/**
 * Matches values that do not exist in an array specified to the query.
 *
 * @param a
 * @param b
 * @returns {*|boolean}
 */
export declare function $nin(a: any, b: any): boolean;
/**
 * Matches values that are less than the value specified in the query.
 *
 * @param a
 * @param b
 * @returns {boolean}
 */
export declare function $lt(a: any, b: any): boolean;
/**
 * Matches values that are less than or equal to the value specified in the query.
 *
 * @param a
 * @param b
 * @returns {boolean}
 */
export declare function $lte(a: any, b: any): boolean;
/**
 * Matches values that are greater than the value specified in the query.
 *
 * @param a
 * @param b
 * @returns {boolean}
 */
export declare function $gt(a: any, b: any): boolean;
/**
 * Matches values that are greater than or equal to the value specified in the query.
 *
 * @param a
 * @param b
 * @returns {boolean}
 */
export declare function $gte(a: any, b: any): boolean;
/**
 * Performs a modulo operation on the value of a field and selects documents with a specified result.
 *
 * @param a
 * @param b
 * @returns {boolean}
 */
export declare function $mod(a: any, b: number[]): boolean;
/**
 * Selects documents where values match a specified regular expression.
 *
 * @param a
 * @param b
 * @returns {boolean}
 */
export declare function $regex(a: any, b: any): boolean;
/**
 * Matches documents that have the specified field.
 *
 * @param a
 * @param b
 * @returns {boolean}
 */
export declare function $exists(a: any, b: any): boolean;
/**
 * Matches arrays that contain all elements specified in the query.
 *
 * @param a
 * @param b
 * @returns boolean
 */
export declare function $all(a: any, b: any): boolean;
/**
 * Selects documents if the array field is a specified size.
 *
 * @param a
 * @param b
 * @returns {*|boolean}
 */
export declare function $size(a: any[], b: number): boolean;
/**
 * Selects documents if element in the array field matches all the specified $elemMatch condition.
 *
 * @param a {Array} element to match against
 * @param b {Object} subquery
 */
export declare function $elemMatch(a: any[], b: object): boolean;
/**
 * Selects documents if a field is of the specified type.
 *
 * @param a
 * @param b
 * @returns {boolean}
 */
export declare function $type(a: any, b: number | string): boolean;
