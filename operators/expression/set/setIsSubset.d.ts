/**
 * Set Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#set-expression-operators
 */
import { Options } from '../../../core';
/**
 * Returns true if all elements of a set appear in a second set.
 * @param obj
 * @param expr
 */
export declare function $setIsSubset(obj: object, expr: any, options: Options): any;
