import { Callback } from '../../../util';
import { Options } from '../../../core';
/**
 * Inverts the effect of a query expression and returns documents that do not match the query expression.
 *
 * @param selector
 * @param value
 * @returns {Function}
 */
export declare function $not(selector: string, value: any, options: Options): Callback<boolean>;
