import {variance} from "./data/stats_helpers.js";

/**
 * Gets the sum of an array of numbers.
 * @param array
 * @returns {*}
 * see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
 * prototype functions. Very useful
 */
export function getSum(array) {
    let z = 0
    for(const x of array) {
        z = z + x
    }
    return z
}


/**
 * Calculates the median of an array of numbers.
 * @param {number[]} array
 * @returns {number|*}
 *
 * example:
 * let array = [3,2,5,6,2,7,4,2,7,5];
 * console.log(getMedian(array)); // 4.5
 */
export function getMedian(array) {
    array.sort(function(a, b){return a - b})
    let x
    if (array.length % 2 == 0) {
        x = (array[(array.length/2) - 1] + array[array.length/2]) / 2
    } else {
        x = (array[(array.length/2) - 0.5])
    }
    return x
}

/**
 * Calculates statistics (see below) on an array of numbers.
 * Look at the stats_helper.js file. It does variance which is used to calculate std deviation.
 * @param {number[]} array
 * @returns {{min: *, median: *, max: *, variance: *, mean: *, length: *, sum: *, standard_deviation: *}}
 *
 * example:
 * getStatistics([3,2,4,5,5,5,2,6,7])
 * {
  length: 9,
  sum: 39,
  mean: 4.333333333333333,
  median: 5,
  min: 2,
  max: 7,
  variance: 2.6666666666666665,
  standard_deviation: 1.632993161855452
 }
 */
export function getStatistics(array) {
    let stats = {}
    let min1 = Math.min(...array)
    let median1 = getMedian(array)
    let max1 = Math.max(...array)
    let sum1 = getSum(array)
    let length1 = array.length
    let mean1 = sum1 / length1
    let variance1 = variance(array, mean1)
    let std = Math.sqrt(variance1)

    stats.length = length1
    stats.sum = sum1
    stats.mean = mean1
    stats.median = median1
    stats.min = min1
    stats.max = max1
    stats.variance = variance1
    stats.standard_deviation = std
    
    return stats
}

