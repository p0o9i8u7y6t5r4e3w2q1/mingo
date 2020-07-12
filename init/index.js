"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Loads all Query and Projection operators
 */
const booleanOperators = require("../operators/expression/boolean");
const comparisonOperators = require("../operators/expression/comparison");
const pipeline_1 = require("../operators/pipeline");
const queryOperators = require("../operators/query");
const projectionOperators = require("../operators/projection");
// helpers
const core_1 = require("../core");
const util_1 = require("../util");
/**
 * Enable default operators. This includes only query and projection operators
 */
function enableDefaultOperators() {
    core_1.useOperators(core_1.OperatorType.EXPRESSION, util_1.into({}, booleanOperators, comparisonOperators));
    core_1.useOperators(core_1.OperatorType.PIPELINE, { $project: pipeline_1.$project, $skip: pipeline_1.$skip, $limit: pipeline_1.$limit, $sort: pipeline_1.$sort });
    core_1.useOperators(core_1.OperatorType.PROJECTION, projectionOperators);
    core_1.useOperators(core_1.OperatorType.QUERY, queryOperators);
}
enableDefaultOperators();
