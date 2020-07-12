import { Options } from '../../core';
export declare const $eq: (obj: object, expr: any, options: Options) => boolean;
export declare const $gt: (obj: object, expr: any, options: Options) => boolean;
export declare const $gte: (obj: object, expr: any, options: Options) => boolean;
export declare const $lt: (obj: object, expr: any, options: Options) => boolean;
export declare const $lte: (obj: object, expr: any, options: Options) => boolean;
export declare const $ne: (obj: object, expr: any, options: Options) => boolean;
/**
 * Compares two values and returns the result of the comparison as an integer.
 *
 * @param obj
 * @param expr
 * @returns {number}
 */
export declare function $cmp(obj: object, expr: any, options: Options): any;
