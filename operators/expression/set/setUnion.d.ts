/**
 * Set Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#set-expression-operators
 */
import { Options } from '../../../core';
/**
 * Returns a set that holds all elements of the input sets.
 * @param obj
 * @param expr
 */
export declare function $setUnion(obj: object, expr: any, options: Options): any;
