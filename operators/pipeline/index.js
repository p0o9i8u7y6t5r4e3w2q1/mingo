"use strict";
/**
 * Pipeline Aggregation Stages. https://docs.mongodb.com/manual/reference/operator/aggregation-
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
__exportStar(require("./addFields"), exports);
__exportStar(require("./bucket"), exports);
__exportStar(require("./bucketAuto"), exports);
__exportStar(require("./count"), exports);
__exportStar(require("./facet"), exports);
__exportStar(require("./group"), exports);
__exportStar(require("./limit"), exports);
__exportStar(require("./lookup"), exports);
__exportStar(require("./match"), exports);
__exportStar(require("./out"), exports);
__exportStar(require("./project"), exports);
__exportStar(require("./redact"), exports);
__exportStar(require("./replaceRoot"), exports);
__exportStar(require("./replaceWith"), exports);
__exportStar(require("./sample"), exports);
__exportStar(require("./set"), exports);
__exportStar(require("./skip"), exports);
__exportStar(require("./sort"), exports);
__exportStar(require("./sortByCount"), exports);
__exportStar(require("./unwind"), exports);
