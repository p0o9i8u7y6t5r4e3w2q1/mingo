import { Iterator } from '../../lazy';
import { Options } from '../../core';
/**
 * Takes an array of documents and returns them as a stream of documents.
 *
 * @param collection
 * @param expr
 * @param options
 * @returns {Array}
 */
export declare function $unwind(collection: Iterator, expr: any, options: Options): Iterator;
