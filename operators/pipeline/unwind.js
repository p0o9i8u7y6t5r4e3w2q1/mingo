"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$unwind = void 0;
const util_1 = require("../../util");
const lazy_1 = require("../../lazy");
/**
 * Takes an array of documents and returns them as a stream of documents.
 *
 * @param collection
 * @param expr
 * @param options
 * @returns {Array}
 */
function $unwind(collection, expr, options) {
    if (util_1.isString(expr))
        expr = { path: expr };
    let field = expr.path.substr(1);
    let includeArrayIndex = expr.includeArrayIndex || false;
    let preserveNullAndEmptyArrays = expr.preserveNullAndEmptyArrays || false;
    let format = (o, i) => {
        if (includeArrayIndex !== false)
            o[includeArrayIndex] = i;
        return o;
    };
    let value;
    return lazy_1.Lazy(() => {
        while (true) {
            // take from lazy sequence if available
            if (value instanceof lazy_1.Iterator) {
                let tmp = value.next();
                if (!tmp.done)
                    return tmp;
            }
            // fetch next object
            let obj = collection.next();
            if (obj.done)
                return obj;
            // unwrap value
            obj = obj.value;
            // get the value of the field to unwind
            value = util_1.resolve(obj, field);
            // throw error if value is not an array???
            if (util_1.isArray(value)) {
                if (value.length === 0 && preserveNullAndEmptyArrays === true) {
                    value = null; // reset unwind value
                    let tmp = util_1.cloneDeep(obj);
                    util_1.removeValue(tmp, field);
                    return { value: format(tmp, null), done: false };
                }
                else {
                    // construct a lazy sequence for elements per value
                    value = lazy_1.Lazy(value).map((item, i) => {
                        let tmp = util_1.cloneDeep(obj);
                        util_1.setValue(tmp, field, item);
                        return format(tmp, i);
                    });
                }
            }
            else if (!util_1.isEmpty(value) || preserveNullAndEmptyArrays === true) {
                let tmp = util_1.cloneDeep(obj);
                return { value: format(tmp, null), done: false };
            }
        }
    });
}
exports.$unwind = $unwind;
