import { Options } from '../../../core';
/**
 * Trims the resolved string
 *
 * @param obj
 * @param expr
 * @param options
 */
export declare function trimString(obj: object, expr: any, options: Options, trimOpts: {
    left: boolean;
    right: boolean;
}): string;
/**
 * Performs a regex search
 *
 * @param obj
 * @param expr
 * @param opts
 */
export declare function regexSearch(obj: object, expr: any, options: Options, reOpts: {
    global: boolean;
}): any;
