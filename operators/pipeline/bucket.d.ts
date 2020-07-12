import { Options } from '../../core';
import { Iterator } from '../../lazy';
/**
 * Categorizes incoming documents into groups, called buckets, based on a specified expression and bucket boundaries.
 * https://docs.mongodb.com/manual/reference/operator/aggregation/bucket/
 *
 * @param {*} collection
 * @param {*} expr
 * @param {Options} opt Pipeline options
 */
export declare function $bucket(collection: Iterator, expr: any, options: Options): Iterator;
