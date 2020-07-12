import { Options } from "../../../core";
export declare class TypeConvertError extends Error {
    constructor(message: string);
}
export declare function toInteger(obj: object, expr: any, options: Options, max: number, min: number, typename: string): number | null;
