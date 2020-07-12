import { Callback } from '../../../util';
import { Options } from '../../../core';
/**
 * Joins query clauses with a logical NOR returns all documents that fail to match both clauses.
 *
 * @param selector
 * @param value
 * @returns {Function}
 */
export declare function $nor(selector: string, value: any, options: Options): Callback<boolean>;
