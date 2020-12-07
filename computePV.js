const Finance = require("tvm-financejs")
const finance = new Finance()
const level2PV = require("./level2PV")

module.exports = function computePV(costs, period, rate) {
	const percentRate = rate / 100
	const size = costs.length
	//rate not in %
	if (size <= 0) {
		return 0
	} else if (size > 0 && size <= 1) {
		const [fv] = costs
		const pv = -finance.PV(percentRate, period, 0, fv)
		return pv
	} else if (size > 1 && size <= 2) {
		const fv = costs[0] + costs[1] //compute for PV
		const pv = -finance.PV(percentRate, period, 0, fv)
		return pv
	} else {
		const fv = level2PV(costs, rate)
		const pv = -finance.PV(percentRate, period, 0, fv)
		return pv
	}
}
