"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// all system operators
const accumulatorOperators = require("../operators/accumulator");
const expressionOperators = require("../operators/expression");
const pipelineOperators = require("../operators/pipeline");
const queryOperators = require("../operators/query");
const projectionOperators = require("../operators/projection");
// helpers
const core_1 = require("../core");
/**
 * Enable all supported MongoDB operators
 */
function enableSystemOperators() {
    core_1.useOperators(core_1.OperatorType.ACCUMULATOR, accumulatorOperators);
    core_1.useOperators(core_1.OperatorType.EXPRESSION, expressionOperators);
    core_1.useOperators(core_1.OperatorType.PIPELINE, pipelineOperators);
    core_1.useOperators(core_1.OperatorType.PROJECTION, projectionOperators);
    core_1.useOperators(core_1.OperatorType.QUERY, queryOperators);
}
enableSystemOperators();
