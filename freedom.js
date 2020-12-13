const Finance = require("tvm-financejs")
const computePV = require("./computePV")
const finance = new Finance()

const cashFlows = require("./constants/cashFlows")
const startingAge = 24
const currentAge = 24
const offset = startingAge
const retirementAge = 60
const surplus = 300

for (let i = currentAge - offset; i < cashFlows.length; i++) {
	let annuity = 0
	let growingAnnuity = 0
	let freePV = 0
	const cashCopy = [].concat(cashFlows)
	const forPrepCashFlows = cashCopy.slice(i + 1)
	if (forPrepCashFlows.length <= 0) {
		return 0
	} else {
	}
}
