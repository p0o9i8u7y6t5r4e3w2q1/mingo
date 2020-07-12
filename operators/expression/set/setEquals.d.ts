/**
 * Set Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#set-expression-operators
 */
import { Options } from '../../../core';
/**
 * Returns true if two sets have the same elements.
 * @param obj
 * @param expr
 */
export declare function $setEquals(obj: object, expr: any, options: Options): any;
