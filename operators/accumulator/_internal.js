"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stddev = void 0;
/**
 * Compute the standard deviation of the data set
 * @param {Array} array of numbers
 * @param {Boolean} if true calculates a sample standard deviation, otherwise calculates a population stddev
 * @return {Number}
 */
function stddev(data, sampled) {
    let sum = data.reduce((acc, n) => acc + n, 0);
    let N = data.length || 1;
    let correction = (sampled && 1) || 0;
    let avg = sum / N;
    return Math.sqrt(data.reduce((acc, n) => acc + Math.pow(n - avg, 2), 0) / (N - correction));
}
exports.stddev = stddev;
