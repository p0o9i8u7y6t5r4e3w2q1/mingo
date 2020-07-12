import { Callback } from '../../../util';
import { Options } from '../../../core';
/**
 * Joins query clauses with a logical AND returns all documents that match the conditions of both clauses.
 *
 * @param selector
 * @param value
 * @returns {Function}
 */
export declare function $and(selector: string, value: any[], options: Options): Callback<boolean>;
