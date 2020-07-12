import { Options } from '../../core';
import { Iterator } from '../../lazy';
/**
 * Groups documents together for the purpose of calculating aggregate values based on a collection of documents.
 *
 * @param collection
 * @param expr
 * @param options
 * @returns {Array}
 */
export declare function $group(collection: Iterator, expr: any, options: Options): Iterator;
