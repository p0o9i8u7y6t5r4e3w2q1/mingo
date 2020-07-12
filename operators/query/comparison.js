"use strict";
// Query Comparison Operators: https://docs.mongodb.com/manual/reference/operator/query-comparison/
Object.defineProperty(exports, "__esModule", { value: true });
exports.$nin = exports.$ne = exports.$lte = exports.$lt = exports.$in = exports.$gte = exports.$gt = exports.$eq = void 0;
const _predicates_1 = require("../_predicates");
/**
 * Matches values that are equal to a specified value.
 */
exports.$eq = _predicates_1.createQueryOperator(_predicates_1.$eq);
/**
 * Matches values that are greater than a specified value.
 */
exports.$gt = _predicates_1.createQueryOperator(_predicates_1.$gt);
/**
 * 	Matches values that are greater than or equal to a specified value.
 */
exports.$gte = _predicates_1.createQueryOperator(_predicates_1.$gte);
/**
 * Matches any of the values that exist in an array specified in the query.
 */
exports.$in = _predicates_1.createQueryOperator(_predicates_1.$in);
/**
 * Matches values that are less than the value specified in the query.
 */
exports.$lt = _predicates_1.createQueryOperator(_predicates_1.$lt);
/**
 * Matches values that are less than or equal to the value specified in the query.
 */
exports.$lte = _predicates_1.createQueryOperator(_predicates_1.$lte);
/**
 * Matches all values that are not equal to the value specified in the query.
 */
exports.$ne = _predicates_1.createQueryOperator(_predicates_1.$ne);
/**
 * Matches values that do not exist in an array specified to the query.
 */
exports.$nin = _predicates_1.createQueryOperator(_predicates_1.$nin);
