const Finance = require("tvm-financejs")
const allocate = require("./allocate")
const computeGPMT = require("./computeGPMT")
const finance = new Finance()

// const cashFlows = require("./constants/cashFlows")
const cashFlows = require("./angel/angel_cashFlows")
const determineRate = require("./determineRate")
const startingAge = 24
const currentAge = 24
const retirementAge = 80
const annuityRate = 5
const surplus = 300
const initialBalance = 2000

const offset = startingAge
function computeFreeAge(cashFlows) {
	for (let i = currentAge - offset; i < cashFlows.length; i++) {
		let annuity = 0
		let growingAnnuity = 0
		let allocation = null
		let freeFV = 0
		let period = 0

		if (i + offset == currentAge) {
			period = 1
		} else {
			period = i + offset - currentAge
		}

		const prepRate = determineRate(period)
		const initialFV = finance.FV(prepRate / 100, period, 0, -initialBalance)

		const cashCopy = [].concat(cashFlows)
		const forPrepCashFlows = cashCopy.slice(i + 1, retirementAge - offset) //[currentAddress + 1,36)

		if (forPrepCashFlows.length <= 0) {
			return 0
		} else {
			//determine future value to be prepared
			allocation = allocate(forPrepCashFlows)
			freeFV = Number(allocation.sum)
		}

		growingAnnuity = computeGPMT(
			initialFV,
			freeFV,
			period,
			annuityRate / 100,
			prepRate / 100
		)
		annuity = -finance.PMT(prepRate / 100 / 12, period * 12, 0, freeFV)

		if (annuity <= surplus || growingAnnuity <= surplus) {
			return {
				freedomAge: i + offset,
				deadline: period,
				prepRate,
				growingAnnuity,
				annuity,
				allocation
			}
		} else {
			console.log(i + offset, growingAnnuity)
			continue
		}
	}
	return "can't be free with current surplus"
}

console.log(computeFreeAge(cashFlows))
