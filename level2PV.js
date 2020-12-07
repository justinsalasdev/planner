const Finance = require("financejs")
const partitionCosts = require("./partitionCosts")
const finance = new Finance()
const { equityRate, proRate, bondRate, moneyRate } = require("./rates")
const {
	moneyPeriod,
	bondPeriod,
	proPeriod,
	equityPeriod
} = require("./periods")

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
	const moneyPV = computePV(moneyArray, moneyPeriod, moneyRate)
	const bondPV = computePV(fourArray, bondPeriod, bondRate)
	const proPV = computePV(sevenArray, proPeriod, proRate)
	const equityPV = computePV(tenArray, equityPeriod, equityRate)
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

function computePV(costs, period, rate) {
	const size = costs.length
	//rate not in %
	if (size <= 0) {
		return 0
	} else if (size > 0 && size <= 1) {
		const [fv] = costs
		const pv = fv * (1 / Math.pow(1 + rate / 100, period))
		return pv
	} else if (size > 1 && size <= 2) {
		const fv = costs[0] + costs[1] //compute for PV
		const pv = fv * (1 / Math.pow(1 + rate / 100, period))
		return pv
	} else {
		const [initial] = costs.splice(0, 1) //returns element 0 & mutates array
		const npv = finance.NPV.apply(null, [rate / 2, 0, ...costs])
		const fv = initial + npv
		const pv = fv * (1 / Math.pow(1 + rate / 100, period))
		return pv
	}
}
