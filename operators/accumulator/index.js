"use strict";
/**
 * Group stage Accumulator Operators. https://docs.mongodb.com/manual/reference/operator/aggregation-
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./addToSet"), exports);
__exportStar(require("./avg"), exports);
__exportStar(require("./first"), exports);
__exportStar(require("./last"), exports);
__exportStar(require("./max"), exports);
__exportStar(require("./mergeObjects"), exports);
__exportStar(require("./min"), exports);
__exportStar(require("./push"), exports);
__exportStar(require("./stdDevPop"), exports);
__exportStar(require("./stdDevSamp"), exports);
__exportStar(require("./sum"), exports);
