"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$redact = void 0;
const util_1 = require("../../util");
const core_1 = require("../../core");
/**
 * Restricts the contents of the documents based on information stored in the documents themselves.
 *
 * https://docs.mongodb.com/manual/reference/operator/aggregation/redact/
 */
function $redact(collection, expr, options) {
    return collection.map(obj => core_1.redact(util_1.cloneDeep(obj), expr, options));
}
exports.$redact = $redact;
