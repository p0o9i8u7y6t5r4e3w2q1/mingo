import { Options } from "../../../core";
export declare const MILLIS_PER_DAY: number;
export declare const MINUTES_PER_HOUR = 60;
export declare const DATE_FORMAT = "%Y-%m-%dT%H:%M:%S.%LZ";
export declare const DATE_PART_INTERVAL: (string | number)[][];
export declare const DATE_SYM_TABLE: {
    '%Y': {
        name: string;
        padding: number;
        re: RegExp;
    };
    '%G': {
        name: string;
        padding: number;
        re: RegExp;
    };
    '%m': {
        name: string;
        padding: number;
        re: RegExp;
    };
    '%d': {
        name: string;
        padding: number;
        re: RegExp;
    };
    '%H': {
        name: string;
        padding: number;
        re: RegExp;
    };
    '%M': {
        name: string;
        padding: number;
        re: RegExp;
    };
    '%S': {
        name: string;
        padding: number;
        re: RegExp;
    };
    '%L': {
        name: string;
        padding: number;
        re: RegExp;
    };
    '%u': {
        name: string;
        padding: number;
        re: RegExp;
    };
    '%V': {
        name: string;
        padding: number;
        re: RegExp;
    };
    '%z': {
        name: string;
        padding: number;
        re: RegExp;
    };
    '%Z': {
        name: string;
        padding: number;
        re: RegExp;
    };
    '%%': string;
};
export interface Timezone {
    hour: number;
    minute: number;
}
/**
 * Parse and return the timezone string as a number
 * @param tzstr Timezone string matching '+/-hh[:][mm]'
 */
export declare function parseTimezone(tzstr?: string): Timezone;
/**
 * Formats the timezone for output
 * @param tz A timezone object
 */
export declare function formatTimezone(tz: Timezone): string;
/**
 * Adjust the date by the given timezone
 * @param d Date object
 * @param tz Timezone
 */
export declare function adjustDate(d: Date, tz: Timezone): void;
/**
 * Computes a date expression
 */
export declare function computeDate(obj: any, expr: any, options: Options): Date;
export declare function padDigits(n: number, digits: number): string;
export declare function regexQuote(s: string): string;
export declare function regexStrip(s: string): string;
