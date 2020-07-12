"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$addFields = void 0;
const util_1 = require("../../util");
const core_1 = require("../../core");
/**
 * Adds new fields to documents.
 * Outputs documents that contain all existing fields from the input documents and newly added fields.
 *
 * @param {Iterator} collection
 * @param {Object} expr
 * @param {Options} options
 */
function $addFields(collection, expr, options) {
    let newFields = util_1.keys(expr);
    if (newFields.length === 0)
        return collection;
    return collection.map(obj => {
        let newObj = util_1.cloneDeep(obj);
        util_1.each(newFields, (field) => {
            let newValue = core_1.computeValue(obj, expr[field], null, options);
            if (newValue !== undefined) {
                util_1.setValue(newObj, field, newValue);
            }
            else {
                util_1.removeValue(newObj, field);
            }
        });
        return newObj;
    });
}
exports.$addFields = $addFields;
