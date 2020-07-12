"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$lookup = void 0;
const util_1 = require("../../util");
/**
 * Performs a left outer join to another collection in the same database to filter in documents from the “joined” collection for processing.
 *
 * @param collection
 * @param expr
 * @param opt
 */
function $lookup(collection, expr, options) {
    let joinColl = expr.from;
    let localField = expr.localField;
    let foreignField = expr.foreignField;
    let asField = expr.as;
    util_1.assert(util_1.isArray(joinColl) && util_1.isString(foreignField) && util_1.isString(localField) && util_1.isString(asField), '$lookup: invalid argument');
    let hash = {};
    util_1.each(joinColl, obj => {
        let k = util_1.hashCode(util_1.resolve(obj, foreignField));
        hash[k] = hash[k] || [];
        hash[k].push(obj);
    });
    return collection.map(obj => {
        let k = util_1.hashCode(util_1.resolve(obj, localField));
        let newObj = util_1.into({}, obj);
        newObj[asField] = hash[k] || [];
        return newObj;
    });
}
exports.$lookup = $lookup;
