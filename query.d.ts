import { Cursor } from './cursor';
import { Config } from './core';
import { Source } from './lazy';
/**
 * An object used to filter input documents
 *
 * @param criteria The criteria for constructing predicates
 * @param config Optional config
 * @constructor
 */
export declare class Query {
    private __criteria;
    private __compiled;
    private __config;
    constructor(criteria: object, config?: Config);
    _compile(): void;
    _processOperator(field: string, operator: string, value: any): void;
    /**
     * Checks if the object passes the query criteria. Returns true if so, false otherwise.
     *
     * @param obj The object to test
     * @returns {boolean} True or false
     */
    test(obj: any): boolean;
    /**
     * Returns a cursor to select matching documents from the input source.
     *
     * @param source A source providing a sequence of documents
     * @param projection An optional projection criteria
     * @returns {Cursor} A Cursor for iterating over the results
     */
    find(collection: Source, projection?: object): Cursor;
    /**
     * Remove matched documents from the collection returning the remainder
     *
     * @param collection An array of documents
     * @returns {Array} A new array with matching elements removed
     */
    remove(collection: object[]): object[];
}
