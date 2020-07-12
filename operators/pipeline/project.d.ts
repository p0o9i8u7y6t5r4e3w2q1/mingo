import { Options } from '../../core';
import { Iterator } from '../../lazy';
/**
 * Reshapes a document stream.
 * $project can rename, add, or remove fields as well as create computed values and sub-documents.
 *
 * @param collection
 * @param expr
 * @param opt
 * @returns {Array}
 */
export declare function $project(collection: Iterator, expr: any, options: Options): Iterator;
