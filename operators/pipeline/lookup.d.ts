import { Iterator } from '../../lazy';
import { Options } from '../../core';
/**
 * Performs a left outer join to another collection in the same database to filter in documents from the “joined” collection for processing.
 *
 * @param collection
 * @param expr
 * @param opt
 */
export declare function $lookup(collection: Iterator, expr: any, options: Options): Iterator;
