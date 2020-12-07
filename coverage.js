const computePV = require("./computePV")
const costArray = require("./input")
const partitionCosts = require("./partitionCosts")
const { equityRate, proRate, bondRate, moneyRate } = require("./rates")
const {
	moneyPeriod,
	bondPeriod,
	proPeriod,
	equityPeriod
} = require("./periods")

//[0,1,2,3,4,5,6,7]
//year1 - year3 cash    [0,2]
//year4 - 2%            [3]
//year5 - year9 4%      [4-8]
//year10 - year19 7%    [9-18]
//year 20 -             [19-length]

const {
	cashArray,
	moneyArray,
	fourArray,
	sevenArray,
	tenArray
} = partitionCosts(costArray)

console.log("cash", cashArray.length)
console.log("money", moneyArray.length)
console.log("four", fourArray.length)
console.log("seven", sevenArray.length)
console.log("10", tenArray.length)

const cashPV = (cashArray[0] || 0) + (cashArray[1] || 0) + (cashArray[2] || 0)
const moneyPV = computePV(moneyArray, moneyPeriod, moneyRate)
const bondPV = computePV(fourArray, bondPeriod, bondRate)
const proPV = computePV(sevenArray, proPeriod, proRate)
const equityPV = computePV(tenArray, equityPeriod, equityRate)

// console.log(cashPV, moneyPV, bondPV, proPV, equityPV)

const coverage = cashPV + moneyPV + bondPV + proPV + equityPV
const round2 = money => money.toFixed(2)

console.log({
	sum: round2(coverage),
	cash: round2(cashPV),
	"@2%": round2(moneyPV),
	"@4%": round2(bondPV),
	"@7%": round2(proPV),
	"@10%": round2(equityPV)
})

// console.log(coverage.toFixed(2))
