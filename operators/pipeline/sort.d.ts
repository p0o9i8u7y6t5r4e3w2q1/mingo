import { Iterator } from '../../lazy';
import { Options } from '../../core';
/**
 * Options to sort operator
 */
export interface SortOptions extends Options {
    collation?: CollationSpec;
}
export interface CollationSpec {
    locale: string;
    caseLevel?: boolean;
    caseFirst?: string;
    strength?: number;
    numericOrdering?: boolean;
    alternate?: string;
    maxVariable?: string;
    backwards?: boolean;
}
/**
 * Takes all input documents and returns them in a stream of sorted documents.
 *
 * @param collection
 * @param sortKeys
 * @param  {Object} options
 * @returns {*}
 */
export declare function $sort(collection: Iterator, sortKeys: object, options: SortOptions): Iterator;
