import { Callback } from '../../../util';
import { Options } from '../../../core';
/**
 * Joins query clauses with a logical OR returns all documents that match the conditions of either clause.
 *
 * @param selector
 * @param value
 * @returns {Function}
 */
export declare function $or(selector: string, value: any[], options: Options): Callback<boolean>;
