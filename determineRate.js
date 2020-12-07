module.exports = function determineRate(period) {
	switch (true) {
		case period <= 3:
			return 0
		case period <= 4:
			return 2
		case period <= 9:
			return 4
		case period <= 19:
			return 7
		default:
			return 10
	}
}
