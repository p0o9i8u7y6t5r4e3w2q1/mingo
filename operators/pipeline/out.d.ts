import { Iterator } from '../../lazy';
import { Options } from '../../core';
/**
 * Takes the documents returned by the aggregation pipeline and writes them to a specified collection.
 *
 * Unlike the $out operator in MongoDB, this operator can appear in any position in the pipeline and is
 * useful for collecting intermediate results of an aggregation operation.
 *
 * @param collection
 * @param expr
 * @param options
 * @returns {*}
 */
export declare function $out(collection: Iterator, expr: any, options: Options): Iterator;
