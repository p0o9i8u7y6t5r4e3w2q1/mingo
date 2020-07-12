import { Iterator } from '../../lazy';
import { Options } from '../../core';
/**
 * Returns a document that contains a count of the number of documents input to the stage.
 *
 * @param {Array} collection
 * @param {String} expr
 * @param {Options} options
 * @return {Object}
 */
export declare function $count(collection: Iterator, expr: any, options: Options): Iterator;
