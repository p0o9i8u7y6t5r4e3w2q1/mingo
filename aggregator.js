"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Aggregator = void 0;
const util_1 = require("./util");
const core_1 = require("./core");
const lazy_1 = require("./lazy");
/**
 * Provides functionality for the mongoDB aggregation pipeline
 *
 * @param pipeline an Array of pipeline operators
 * @param config An optional configuration or options passed from an earlier operator
 * @constructor
 */
class Aggregator {
    constructor(pipeline, config) {
        this.__pipeline = pipeline;
        let o = config;
        this.__options = o && o['config'] ? o : { config: config };
        this.__options.config = this.__options.config || core_1.createConfig();
    }
    /**
     * Returns an `Lazy` iterator for processing results of pipeline
     *
     * @param {*} collection An array or iterator object
     * @param {Query} query the `Query` object to use as context
     * @returns {Iterator} an iterator object
     */
    stream(collection) {
        let iterator = lazy_1.Lazy(collection);
        if (!util_1.isEmpty(this.__pipeline)) {
            // run aggregation pipeline
            util_1.each(this.__pipeline, (operator) => {
                let operatorKeys = util_1.keys(operator);
                let op = operatorKeys[0];
                let call = core_1.getOperator(core_1.OperatorType.PIPELINE, op);
                util_1.assert(operatorKeys.length === 1 && !!call, `invalid aggregation operator ${op}`);
                iterator = call(iterator, operator[op], this.__options);
            });
        }
        return iterator;
    }
    /**
     * Return the results of the aggregation as an array.
     *
     * @param {*} collection
     * @param {*} query
     */
    run(collection) {
        return this.stream(collection).value();
    }
}
exports.Aggregator = Aggregator;
