"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.aggregate = exports.remove = exports.find = void 0;
const query_1 = require("./query");
const aggregator_1 = require("./aggregator");
// loads all default operators
require("./init");
var query_2 = require("./query");
Object.defineProperty(exports, "Query", { enumerable: true, get: function () { return query_2.Query; } });
var aggregator_2 = require("./aggregator");
Object.defineProperty(exports, "Aggregator", { enumerable: true, get: function () { return aggregator_2.Aggregator; } });
/**
 * Performs a query on a collection and returns a cursor object.
 * Shorthand for `Query(criteria).find(collection, projection)`
 *
 * @param collection Array of objects
 * @param criteria Query criteria
 * @param projection Projection criteria
 * @returns {Cursor} A cursor of results
 */
function find(collection, criteria, projection) {
    return new query_1.Query(criteria).find(collection, projection);
}
exports.find = find;
/**
 * Returns a new array without objects which match the criteria
 *
 * @param collection Array of objects
 * @param criteria Query criteria of objects to remove
 * @returns {Array} New filtered array
 */
function remove(collection, criteria) {
    return new query_1.Query(criteria).remove(collection);
}
exports.remove = remove;
/**
 * Return the result collection after running the aggregation pipeline for the given collection.
 * Shorthand for `(new Aggregator(pipeline, options)).run(collection)`
 *
 * @param {Array} collection Collection or stream of objects
 * @param {Array} pipeline The pipeline operators to use
 * @returns {Array} New array of results
 */
function aggregate(collection, pipeline) {
    return (new aggregator_1.Aggregator(pipeline)).run(collection);
}
exports.aggregate = aggregate;
// default interface
exports.default = {
    Aggregator: aggregator_1.Aggregator,
    Query: query_1.Query,
    aggregate,
    find,
    remove
};
