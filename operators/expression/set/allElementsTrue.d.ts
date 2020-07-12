/**
 * Set Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#set-expression-operators
 */
import { Options } from '../../../core';
/**
 * Returns true if all elements of a set evaluate to true, and false otherwise.
 * @param obj
 * @param expr
 */
export declare function $allElementsTrue(obj: object, expr: any, options: Options): any;
