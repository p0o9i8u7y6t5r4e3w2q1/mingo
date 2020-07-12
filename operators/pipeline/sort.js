"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$sort = void 0;
const util_1 = require("../../util");
/**
 * Takes all input documents and returns them in a stream of sorted documents.
 *
 * @param collection
 * @param sortKeys
 * @param  {Object} options
 * @returns {*}
 */
function $sort(collection, sortKeys, options) {
    if (util_1.isEmpty(sortKeys) || !util_1.isObject(sortKeys))
        return collection;
    let cmp = util_1.compare;
    let collationSpec = options['collation'];
    // use collation comparator if provided
    if (util_1.isObject(collationSpec) && util_1.isString(collationSpec.locale)) {
        cmp = collationComparator(collationSpec);
    }
    return collection.transform(coll => {
        let modifiers = util_1.keys(sortKeys);
        util_1.each(modifiers.reverse(), key => {
            let grouped = util_1.groupBy(coll, obj => util_1.resolve(obj, key));
            let sortedIndex = {};
            let indexKeys = util_1.sortBy(grouped.keys, (k, i) => {
                sortedIndex[k] = i;
                return k;
            }, cmp);
            if (sortKeys[key] === -1)
                indexKeys.reverse();
            coll = [];
            util_1.each(indexKeys, k => util_1.into(coll, grouped.groups[sortedIndex[k]]));
        });
        return coll;
    });
}
exports.$sort = $sort;
// MongoDB collation strength to JS localeCompare sensitivity mapping.
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare
const COLLATION_STRENGTH = {
    // Only strings that differ in base letters compare as unequal. Examples: a ≠ b, a = á, a = A.
    1: 'base',
    //  Only strings that differ in base letters or accents and other diacritic marks compare as unequal.
    // Examples: a ≠ b, a ≠ á, a = A.
    2: 'accent',
    // Strings that differ in base letters, accents and other diacritic marks, or case compare as unequal.
    // Other differences may also be taken into consideration. Examples: a ≠ b, a ≠ á, a ≠ A
    3: 'variant',
};
/**
 * Creates a comparator function for the given collation spec. See https://docs.mongodb.com/manual/reference/collation/
 *
 * @param spec {Object} The MongoDB collation spec.
 * {
 *   locale: string,
 *   caseLevel: boolean,
 *   caseFirst: string,
 *   strength: int,
 *   numericOrdering: boolean,
 *   alternate: string,
 *   maxVariable: string, // unsupported
 *   backwards: boolean // unsupported
 * }
 */
function collationComparator(spec) {
    let localeOpt = {
        sensitivity: COLLATION_STRENGTH[spec.strength || 3],
        caseFirst: spec.caseFirst === 'off' ? 'false' : (spec.caseFirst || 'false'),
        numeric: spec.numericOrdering || false,
        ignorePunctuation: spec.alternate === 'shifted'
    };
    // when caseLevel is true for strength  1:base and 2:accent, bump sensitivity to the nearest that supports case comparison
    if ((spec.caseLevel || false) === true) {
        if (localeOpt.sensitivity === 'base')
            localeOpt.sensitivity = 'case';
        if (localeOpt.sensitivity === 'accent')
            localeOpt.sensitivity = 'variant';
    }
    const collator = new Intl.Collator(spec.locale, localeOpt);
    return (a, b) => {
        // non strings
        if (!util_1.isString(a) || !util_1.isString(b))
            return util_1.compare(a, b);
        // only for strings
        let i = collator.compare(a, b);
        if (i < 0)
            return -1;
        if (i > 0)
            return 1;
        return 0;
    };
}
