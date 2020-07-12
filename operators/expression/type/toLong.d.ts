/**
 * Type Expression Operators: https://docs.mongodb.com/manual/reference/operator/aggregation/#type-expression-operators
 */
import { Options } from '../../../core';
/**
 * Converts a value to a long. If the value cannot be converted to a long, $toLong errors. If the value is null or missing, $toLong returns null.
 * @param obj
 * @param expr
 */
export declare function $toLong(obj: object, expr: any, options: Options): number | null;
