import { Callback } from '../../../util';
import { Options } from '../../../core';
/**
 * Matches documents that satisfy a JavaScript expression.
 *
 * @param selector
 * @param value
 * @returns {Function}
 */
export declare function $where(selector: string, value: any, options: Options): Callback<boolean>;
