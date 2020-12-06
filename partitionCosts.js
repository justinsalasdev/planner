module.exports = function partionCosts(costArray) {
	const cashArray = []
	const moneyArray = []
	const fourArray = []
	const sevenArray = []
	const tenArray = []

	for (let i = 0; i < costArray.length; i++) {
		//cash flow first 3 years
		if (i <= 2) {
			cashArray.push(costArray[i])

			//cash flow @ 4 years
		} else if (i > 2 && i <= 3) {
			moneyArray.push(costArray[i])

			//cash flow 5 years to 9 years
		} else if (i > 3 && i <= 8) {
			fourArray.push(costArray[i])

			//cash flow 10 years to 19 years
		} else if (i > 8 && i <= 18) {
			sevenArray.push(costArray[i])

			//cash flow 20 years and above
		} else {
			tenArray.push(costArray[i])
		}
	}

	return { cashArray, moneyArray, fourArray, sevenArray, tenArray }
}
