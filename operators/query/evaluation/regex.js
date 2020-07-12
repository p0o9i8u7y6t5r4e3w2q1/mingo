"use strict";
// Query Evaluation Operators: https://docs.mongodb.com/manual/reference/operator/query-evaluation/
Object.defineProperty(exports, "__esModule", { value: true });
exports.$regex = void 0;
const _predicates_1 = require("../../_predicates");
/**
 * Selects documents where values match a specified regular expression.
 */
exports.$regex = _predicates_1.createQueryOperator(_predicates_1.$regex);
