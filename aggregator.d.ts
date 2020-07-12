import { Options, Config } from './core';
import { Iterator, Source } from './lazy';
/**
 * Provides functionality for the mongoDB aggregation pipeline
 *
 * @param pipeline an Array of pipeline operators
 * @param config An optional configuration or options passed from an earlier operator
 * @constructor
 */
export declare class Aggregator {
    private __pipeline;
    private __options;
    constructor(pipeline: object[], config?: Config | Options);
    /**
     * Returns an `Lazy` iterator for processing results of pipeline
     *
     * @param {*} collection An array or iterator object
     * @param {Query} query the `Query` object to use as context
     * @returns {Iterator} an iterator object
     */
    stream(collection: Source): Iterator;
    /**
     * Return the results of the aggregation as an array.
     *
     * @param {*} collection
     * @param {*} query
     */
    run(collection: Source): any[];
}
