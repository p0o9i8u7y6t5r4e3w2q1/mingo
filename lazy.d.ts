import { Callback, Predicate } from './util';
/**
 * Simplified generator interface
 */
interface Generator<T> {
    next: Callback<T>;
}
/**
 * A value produced by a generator
 */
interface Value {
    value?: any;
    done: boolean;
}
export declare type Source = Generator<any> | Callback<any> | Array<any>;
/**
 * Returns an iterator
 * @param {*} source An iterable source (Array, Function, Generator, or Iterator)
 */
export declare function Lazy(source: Source): Iterator;
/**
 * A lazy collection iterator yields a single value at time upon request
 */
export declare class Iterator {
    private __iteratees;
    private __first;
    private __done;
    private __buf;
    private __next;
    /**
     * @param {*} source An iterable object or function.
     *    Array - return one element per cycle
     *    Object{next:Function} - call next() for the next value (this also handles generator functions)
     *    Function - call to return the next value
     * @param {Function} fn An optional transformation function
     */
    constructor(source: Source);
    private _validate;
    /**
     * Add an iteratee to this lazy sequence
     * @param {Object} iteratee
     */
    private _push;
    next(): Value;
    /**
     * Transform each item in the sequence to a new value
     * @param {Function} f
     */
    map(f: Callback<any>): Iterator;
    /**
     * Select only items matching the given predicate
     * @param {Function} pred
     */
    filter(predicate: Predicate<any>): Iterator;
    /**
     * Take given numbe for values from sequence
     * @param {Number} n A number greater than 0
     */
    take(n: number): Iterator;
    /**
     * Drop a number of values from the sequence
     * @param {Number} n Number of items to drop greater than 0
     */
    drop(n: number): Iterator;
    /**
     * Returns a new lazy object with results of the transformation
     * The entire sequence is realized.
     *
     * @param {Function} fn Tranform function of type (Array) => (Any)
     */
    transform(fn: Callback<any>): Iterator;
    /**
     * Mark this lazy object to return only the first result on `lazy.value()`.
     * No more iteratees or transformations can be added after this method is called.
     */
    first(): Iterator;
    /**
     * Returns the fully realized values of the iterators.
     * The return value will be an array unless `lazy.first()` was used.
     * The realized values are cached for subsequent calls
     */
    value(): any;
    /**
     * Execute the funcion for each value. Will stop when an execution returns false.
     * @param {Function} f
     * @returns {Boolean} false iff `f` return false for any execution, otherwise true
     */
    each(f: Callback<any>): boolean;
    /**
     * Returns the reduction of sequence according the reducing function
     *
     * @param {*} f a reducing function
     * @param {*} init
     */
    reduce(f: Callback<any>, initialValue: any): any;
    /**
     * Returns the number of matched items in the sequence
     */
    size(): number;
}
export {};
