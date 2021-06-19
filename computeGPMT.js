module.exports = function computeGPMT(
	initialFV,
	futureValue,
	period,
	annuityRate,
	discountRate
) {
	let effectiveFV = 0
	if (initialFV < futureValue) {
		effectiveFV = futureValue - initialFV
	} else {
		effectiveFV = 0
	}

	const mode = 1

	const adjustedDR = discountRate / mode
	const adjustedPeriod = period * mode
	const adjustedAR = annuityRate / mode

	console.log(initialFV)
	const growingAnnuity =
		(effectiveFV * (adjustedDR - adjustedAR)) /
		(Math.pow(1 + adjustedDR, adjustedPeriod) -
			Math.pow(1 + adjustedAR, adjustedPeriod))

	return growingAnnuity / 12
}
