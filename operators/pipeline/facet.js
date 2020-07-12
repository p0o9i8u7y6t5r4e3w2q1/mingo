"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$facet = void 0;
const util_1 = require("../../util");
const aggregator_1 = require("../../aggregator");
/**
 * Processes multiple aggregation pipelines within a single stage on the same set of input documents.
 * Enables the creation of multi-faceted aggregations capable of characterizing data across multiple dimensions, or facets, in a single stage.
 */
function $facet(collection, expr, options) {
    return collection.transform(array => {
        return [util_1.objectMap(expr, pipeline => new aggregator_1.Aggregator(pipeline, options).run(array))];
    });
}
exports.$facet = $facet;
