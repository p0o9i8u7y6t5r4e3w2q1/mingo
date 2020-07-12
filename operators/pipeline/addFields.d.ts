import { Options } from '../../core';
import { Iterator } from '../../lazy';
/**
 * Adds new fields to documents.
 * Outputs documents that contain all existing fields from the input documents and newly added fields.
 *
 * @param {Iterator} collection
 * @param {Object} expr
 * @param {Options} options
 */
export declare function $addFields(collection: Iterator, expr: any, options: Options): Iterator;
