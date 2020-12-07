const partitionCosts = require("./partitionCosts")
const computePV2 = require("./computePV2")
const {
	equityRate,
	proRate,
	bondRate,
	moneyRate
} = require("./constants/rates")
const {
	moneyPeriod,
	bondPeriod,
	proPeriod,
	equityPeriod
} = require("./constants/periods")

module.exports = function level2PV(costs, rate) {
	const {
		cashArray,
		moneyArray,
		fourArray,
		sevenArray,
		tenArray
	} = partitionCosts(costs)

	console.log("cash", cashArray.length)
	console.log("money", moneyArray.length)
	console.log("four", fourArray.length)
	console.log("seven", sevenArray.length)
	console.log("10", tenArray.length)

	const cashPV = (cashArray[0] || 0) + (cashArray[1] || 0) + (cashArray[2] || 0)
	const moneyPV = computePV2(moneyArray, moneyPeriod, moneyRate)
	const bondPV = computePV2(fourArray, bondPeriod, bondRate)
	const proPV = computePV2(sevenArray, proPeriod, proRate)
	const equityPV = computePV2(tenArray, equityPeriod, equityRate)
	const round2 = money => money.toFixed(2)

	const coverage = cashPV + moneyPV + bondPV + proPV + equityPV

	console.log(
		{
			sum: round2(coverage),
			cash: round2(cashPV),
			"@2%": round2(moneyPV),
			"@4%": round2(bondPV),
			"@7%": round2(proPV),
			"@10%": round2(equityPV)
		},
		`${rate} LEVEL 2 ALLOCATION`
	)

	return coverage
}
