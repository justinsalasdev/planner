const Finance = require("financejs")

const computePV = require("./computePV")

const equityRate = 10
const proRate = 7
const bondRate = 4
const moneyRate = 2

const moneyPeriod = 3
const bondPeriod = 4
const proPeriod = 9
const equityPeriod = 19

//[0,1,2,3,4,5,6,7]
//year1 - year3 cash    [0,2]
//year4 - 2%            [3]
//year5 - year9 4%      [4-8]
//year10 - year19 7%    [9-18]
//year 20 -             [19-length]

const costArray = [
	10488,
	10750.8,
	8461.708,
	8663.71924,
	8858.113917,
	9072.017335,
	9278.600055,
	9505.118056,
	9724.632898,
	9964.531885,
	10197.76824,
	10451.86129,
	10699.65663,
	10968.80633,
	11232.04912,
	11517.17059,
	11796.80341,
	12098.86751,
	12395.89033,
	12715.92704,
	13031.40076,
	8905.795807,
	9106.904681,
	9328.271821,
	9541.994076,
	9776.413898,
	10003.51952,
	10251.7851,
	10493.09095,
	10756.04368,
	11012.41639,
	11290.94888,
	11563.30785,
	11858.36709,
	12147.6877,
	12460.27833,
	12767.59538
]
const cashArray = []
const moneyArray = []
const fourArray = []
const sevenArray = []
const tenArray = []

for (let i = 0; i < costArray.length; i++) {
	if (i <= 2) {
		cashArray.push(costArray[i])
	} else if (i > 2 && i <= 3) {
		moneyArray.push(costArray[i])
	} else if (i > 3 && i <= 8) {
		fourArray.push(costArray[i])
	} else if (i > 8 && i <= 18) {
		sevenArray.push(costArray[i])
	} else {
		tenArray.push(costArray[i])
	}
}

//add zeroes to array
//cash array [Sum only]

console.log("cash", cashArray)

console.log("money", moneyArray)
console.log("four", fourArray)
console.log("seven", sevenArray)
console.log("10", tenArray)

//if array [] pv = 0
//if array [1elem] discount
//if array [2elem] discount sum
//if array [>2]

//pop first element of array
//get NPV of remaining
//add
//get present value

const cashPV = cashArray[0] + cashArray[1] + cashArray[2]
const moneyPV = computePV(moneyArray, moneyPeriod, moneyRate)
const bondPV = computePV(fourArray, bondPeriod, bondRate)
const proPV = computePV(sevenArray, proPeriod, proRate)
const equityPV = computePV(tenArray, equityPeriod, equityRate)

console.log(cashPV, moneyPV, bondPV, proPV, equityPV)

const coverage = cashPV + moneyPV + bondPV + proPV + equityPV

console.log(coverage.toFixed(2))
//compute for NPVs
