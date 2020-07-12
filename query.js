"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Query = void 0;
const util_1 = require("./util");
const cursor_1 = require("./cursor");
const core_1 = require("./core");
/**
 * An object used to filter input documents
 *
 * @param criteria The criteria for constructing predicates
 * @param config Optional config
 * @constructor
 */
class Query {
    constructor(criteria, config) {
        this.__criteria = criteria;
        this.__config = config || core_1.createConfig();
        this.__compiled = [];
        this._compile();
    }
    _compile() {
        util_1.assert(util_1.isObject(this.__criteria), 'query criteria must be an object');
        let whereOperator;
        util_1.each(this.__criteria, (expr, field) => {
            // save $where operators to be executed after other operators
            if ('$where' === field) {
                whereOperator = { field: field, expr: expr };
            }
            else if ('$expr' === field) {
                this._processOperator(field, field, expr);
            }
            else if (util_1.inArray(['$and', '$or', '$nor'], field)) {
                this._processOperator(field, field, expr);
            }
            else {
                // normalize expression
                util_1.assert(!util_1.isOperator(field), `unknown top level operator: ${field}`);
                expr = util_1.normalize(expr);
                util_1.each(expr, (val, op) => {
                    this._processOperator(field, op, val);
                });
            }
            if (util_1.isObject(whereOperator)) {
                this._processOperator(whereOperator.field, whereOperator.field, whereOperator.expr);
            }
        });
    }
    _processOperator(field, operator, value) {
        let call = core_1.getOperator(core_1.OperatorType.QUERY, operator);
        util_1.assert(!!call, `unknown operator ${operator}`);
        this.__compiled.push(call(field, value, this.__config));
    }
    /**
     * Checks if the object passes the query criteria. Returns true if so, false otherwise.
     *
     * @param obj The object to test
     * @returns {boolean} True or false
     */
    test(obj) {
        for (let i = 0, len = this.__compiled.length; i < len; i++) {
            if (!this.__compiled[i](obj)) {
                return false;
            }
        }
        return true;
    }
    /**
     * Returns a cursor to select matching documents from the input source.
     *
     * @param source A source providing a sequence of documents
     * @param projection An optional projection criteria
     * @returns {Cursor} A Cursor for iterating over the results
     */
    find(collection, projection) {
        return new cursor_1.Cursor(collection, x => this.test(x), projection || {}, this.__config);
    }
    /**
     * Remove matched documents from the collection returning the remainder
     *
     * @param collection An array of documents
     * @returns {Array} A new array with matching elements removed
     */
    remove(collection) {
        return collection.reduce((acc, obj) => {
            if (!this.test(obj))
                acc.push(obj);
            return acc;
        }, []);
    }
}
exports.Query = Query;
