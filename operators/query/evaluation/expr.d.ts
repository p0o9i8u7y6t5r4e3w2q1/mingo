import { Options } from '../../../core';
import { Callback } from '../../../util';
/**
 * Allows the use of aggregation expressions within the query language.
 *
 * @param selector
 * @param value
 * @returns {Function}
 */
export declare function $expr(selector: string, value: any, options: Options): Callback<boolean>;
