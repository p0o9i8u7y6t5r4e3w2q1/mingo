/**
 * Conditional Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#conditional-expression-operators
 */
import { Options } from '../../../core';
/**
 * Evaluates an expression and returns the first expression if it evaluates to a non-null value.
 * Otherwise, $ifNull returns the second expression's value.
 *
 * @param obj
 * @param expr
 * @returns {*}
 */
export declare function $ifNull(obj: object, expr: any, options: Options): any;
