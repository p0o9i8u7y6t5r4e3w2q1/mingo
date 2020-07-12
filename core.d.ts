import { Callback } from './util';
/**
 * Config information to use when executing operators
 */
export interface Config {
    idKey: string;
}
/**
 * Creates a new default config
 */
export declare function createConfig(): Config;
/**
 * Generic options interface passed down to all operators
 */
export interface Options {
    config: Config;
}
/**
 * The different groups of operators
 */
export declare enum OperatorType {
    ACCUMULATOR = "accumulator",
    EXPRESSION = "expression",
    PIPELINE = "pipeline",
    PROJECTION = "projection",
    QUERY = "query"
}
interface Operators {
    [key: string]: Function;
}
/**
 * Register fully specified operators for the given operator class.
 *
 * @param cls Category of the operator
 * @param operators Name of operator
 */
export declare function useOperators(cls: OperatorType, operators: Operators): void;
/**
 * Returns the operator function or null if it is not found
 * @param cls Category of the operator
 * @param operator Name of the operator
 */
export declare function getOperator(cls: OperatorType, operator: string): Function;
/**
 * Add new operators
 *
 * @param cls the operator class to extend
 * @param operatorFn a callback that accepts internal object state and returns an object of new operators.
 */
export declare function addOperators(cls: OperatorType, operatorFn: Callback<Operators>): void;
interface ComputeOptions extends Options {
    root?: object;
}
/**
 * Computes the value of the expression on the object for the given operator
 *
 * @param obj the current object from the collection
 * @param expr the expression for the given field
 * @param operator the operator to resolve the field with
 * @param options {Object} extra options
 * @returns {*}
 */
export declare function computeValue(obj: object | any[], expr: any, operator: string, options?: ComputeOptions): any;
/**
 * Redact an object
 * @param  {Object} obj The object to redact
 * @param  {*} expr The redact expression
 * @param  {*} options  Options for value
 * @return {*} returns the result of the redacted object
 */
export declare function redact(obj: object, expr: any, options: ComputeOptions): object;
export {};
