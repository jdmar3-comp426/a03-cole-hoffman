import mpg_data from "./data/mpg_data.js";
import {getStatistics} from "./medium_1.js";

/*
This section can be done by using the array prototype functions.
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
see under the methods section
*/


/**
 * This object contains data that has to do with every car in the `mpg_data` object.
 *
 *
 * @param {allCarStats.avgMpg} Average miles per gallon on the highway and in the city. keys `city` and `highway`
 *
 * @param {allCarStats.allYearStats} The result of calling `getStatistics` from medium_1.js on
 * the years the cars were made.
 *
 * @param {allCarStats.ratioHybrids} ratio of cars that are hybrids
 */
export const allCarStats = {
    avgMpg: getAvgMpg(),
    allYearStats: getAllYearStats(),
    ratioHybrids: getHybrids(),
};

function getAvgMpg() {
    let city1 = 0
    let hway1 = 0
    for (const x of mpg_data) {
        city1 = city1 + x["city_mpg"]
        hway1 = hway1 + x["highway_mpg"]
    }
    city1 = city1 / mpg_data.length
    hway1 = hway1 / mpg_data.length
    let obj = {city: city1, highway: hway1}
    return obj
}

function getAllYearStats() {
    let statArray = []
    for (const x of mpg_data) {
        statArray.push(x["year"])
    }
    return getStatistics(statArray)
}

function getHybrids() {
    let hybrids = 0
    for (const x of mpg_data) {
        if (x["hybrid"]) {
            hybrids = hybrids + 1
        }
    }
    return hybrids / mpg_data.length
}

function makeHybrids() {
    const ids = new Map()
    for (const x of mpg_data) {
        if (x["hybrid"]) {
            if (ids.has(x["make"])) {
                ids.get(x["make"]).push(x["id"])
            } else {
                ids.set(x["make"], [x["id"]])
            }
        }
    }
    let make = []
    for (const x of ids.keys()) {
        if (make.length == 0) {
            make.push(hybObjs(x, ids.get(x)))
        } else if (make[make.length - 1].hybrids.length > ids.get(x).length) {
            make.push(hybObjs(x, ids.get(x)))
        } else {
            let temp = Object.assign(make[make.length - 1])
            make[make.length - 1] = hybObjs(x, ids.get(x))
            make.push(temp)
        }
    }
    return make
}
function hybObjs(make, idList) {
    let obj = {"make": make, "hybrids": idList}
    return obj
}

/**
 * HINT: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
 *
 * @param {moreStats.makerHybrids} Array of objects where keys are the `make` of the car and
 * a list of `hybrids` available (their `id` string). Don't show car makes with 0 hybrids. Sort by the number of hybrids
 * in descending order.
 *
 *[{
 *     "make": "Buick",
 *     "hybrids": [
 *       "2012 Buick Lacrosse Convenience Group",
 *       "2012 Buick Lacrosse Leather Group",
 *       "2012 Buick Lacrosse Premium I Group",
 *       "2012 Buick Lacrosse"
 *     ]
 *   },
 *{
 *     "make": "BMW",
 *     "hybrids": [
 *       "2011 BMW ActiveHybrid 750i Sedan",
 *       "2011 BMW ActiveHybrid 750Li Sedan"
 *     ]
 *}]
 *
 *
 *
 *
 * @param {moreStats.avgMpgByYearAndHybrid} Object where keys are years and each year
 * an object with keys for `hybrid` and `notHybrid`. The hybrid and notHybrid
 * should be an object with keys for `highway` and `city` average mpg.
 *
 * Only years in the data should be keys.
 *
 * {
 *     2020: {
 *         hybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         },
 *         notHybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         }
 *     },
 *     2021: {
 *         hybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         },
 *         notHybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         }
 *     },
 *
 * }
 */

function finalAttempt() {
    const years = new Map()
    for (const x of mpg_data) {
        if (!years.has(x.year)) {
            const tempArray = mpg_data.filter(w => w.year == x.year)
            const tempHyb = tempArray.filter(w => w.hybrid == true)
            const tempNot = tempArray.filter(w => w.hybrid == false)
            let avgHybCity = 0
            let avgHybHigh = 0
            for (const x of tempHyb) {
                avgHybCity = avgHybCity + x.city_mpg
                avgHybHigh = avgHybHigh + x.highway_mpg
            }
            avgHybCity = avgHybCity / tempHyb.length
            avgHybHigh = avgHybHigh / tempHyb.length
            let avgNotCity = 0
            let avgNotHigh = 0
            for (const x of tempNot) {
                avgNotCity = avgNotCity + x.city_mpg
                avgNotHigh = avgNotHigh + x.highway_mpg
            }
            avgNotCity = avgNotCity / tempNot.length
            avgNotHigh = avgNotHigh / tempNot.length
            let internalObj = {hybrid: {city: avgHybCity, highway: avgHybHigh}, notHybrid: {city: avgNotCity, highway: avgNotHigh}}
            years.set(x.year, internalObj)
        }
    }
    const sorted = new Map([...years.entries()].sort())
    const obj = Object.fromEntries(sorted)
    return obj
}


function newStyle() {
    const years = new Map()
    let copy = mpg_data
    while (copy.length > 0) {
        let year = copy[0]["year"]
        let cityHyb = []
        let highHyb = []
        let cityNot = []
        let highNot = []
        for (let i = 0; i < copy.length; i++) {
            if (copy[i]["year"] == year) {
                if (copy[i]["hybrid"]) {
                    cityHyb.push(copy[i]["city_mpg"])
                    highHyb.push(copy[i]["highway_mpg"])
                } else {
                    cityNot.push(copy[i]["city_mpg"])
                    highNot.push(copy[i]["highway_mpg"])
                }
            }
        }
        for (const x of copy) {
            if (x["year"] == year) {
                copy.slice(copy.indexOf(x))
            }
        }
        let cH = summer(cityHyb)
        let hH = summer(highHyb)
        let cN = summer(cityNot)
        let hN = summer(highNot)
        let temp = {hybrid: {city: cH, highway: hH}, notHybrid: {city: cN, highway: hN}}
        years.set(year, temp)
    }
}

function summer(array) {
    let sum = 0
    for (const x of array) {
        sum = sum + x
    }
    sum = sum / array.length
    return sum
}



function avgMpgYrHyb() {
    const avgTracker = {}
    const years = new Map()
    for (const x of mpg_data) {
        if (x["hybrid"]) {
            if (years.has(x["year"])) {
                years.get(x["make"]).push(x["id"])
            } else {
                years.set(x["year"], hybOrNah)
                let curCity = years.get(x["year"]).get(notHybrid).get(city)
                years.get(x["year"]).get(notHybrid).set(city, curCity + x["city_mpg"])
                let curHway = years.get(x["year"]).get(notHybrid).get(highway)
                years.get(x["year"]).get(notHybrid).set(city, curHway + x["highway_mpg"])
                let year = x["year"]
            }
        }
    }
}

function hybOrNah() {
    let map = new Map()
    map.set(hybrid, cityHwy(0, 0))
    map.set(notHybrid, cityHwy(0,0))
}

function cityHwy(cityMpg, hwayMpg) {
    let map = new Map()
    map.set(city, cityMpg)
    map.set(highway, hwayMpg)
    return map
}



 export const moreStats = {
    makerHybrids: makeHybrids(),
    avgMpgByYearAndHybrid: finalAttempt()
};
