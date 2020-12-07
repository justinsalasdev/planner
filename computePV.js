const level2PV = require("./level2PV")

module.exports = function computePV(costs, period, rate) {
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
		// const [initial] = costs.splice(0, 1) //returns element 0 & mutates array
		// const npv = finance.NPV.apply(null, [rate / 2, 0, ...costs])
		const fv = level2PV(costs, rate)
		const pv = fv * (1 / Math.pow(1 + rate / 100, period))
		return pv
	}
}
