import { Options } from '../../core';
/**
 * Projects only the first element from an array that matches the specified $elemMatch condition.
 *
 * @param obj
 * @param field
 * @param expr
 * @returns {*}
 */
export declare function $elemMatch(obj: object, expr: any, field: string, options: Options): any;
