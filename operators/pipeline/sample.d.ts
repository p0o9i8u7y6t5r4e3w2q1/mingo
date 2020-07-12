import { Iterator } from '../../lazy';
import { Options } from '../../core';
/**
 * Randomly selects the specified number of documents from its input. The given iterator must have finite values
 *
 * @param  {Iterator} collection
 * @param  {Object} expr
 * @param  {Options} options
 * @return {*}
 */
export declare function $sample(collection: Iterator, expr: any, options: Options): Iterator;
