module.exports = function computeGPMT(
	futureValue,
	period,
	annuityRate,
	discountRate
) {
	const growingAnnuity =
		(futureValue * (discountRate - annuityRate)) /
		(Math.pow(1 + discountRate, period) - Math.pow(1 + annuityRate, period))

	return growingAnnuity
}
