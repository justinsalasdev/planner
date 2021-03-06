const computePV = require("./computePV")
const partitionCosts = require("./partitionCosts")
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

module.exports = function allocate(annualExpenses) {
	const {
		cashArray,
		moneyArray,
		fourArray,
		sevenArray,
		tenArray
	} = partitionCosts(annualExpenses)

	const cashPV = (cashArray[0] || 0) + (cashArray[1] || 0) + (cashArray[2] || 0)
	const moneyPV = computePV(moneyArray, moneyPeriod, moneyRate)
	const bondPV = computePV(fourArray, bondPeriod, bondRate)
	const proPV = computePV(sevenArray, proPeriod, proRate)
	const equityPV = computePV(tenArray, equityPeriod, equityRate)

	// console.log(cashPV, moneyPV, bondPV, proPV, equityPV)

	const coverage = cashPV + moneyPV + bondPV + proPV + equityPV
	const round2 = money => money.toFixed(2)

	// console.log({
	// 	sum: round2(coverage),
	// 	cash: round2(cashPV),
	// 	"@2%": round2(moneyPV),
	// 	"@4%": round2(bondPV),
	// 	"@7%": round2(proPV),
	// 	"@10%": round2(equityPV)
	// })

	return {
		sum: round2(coverage),
		cash: round2(cashPV),
		"@2%": round2(moneyPV),
		"@4%": round2(bondPV),
		"@7%": round2(proPV),
		"@10%": round2(equityPV)
	}
}
