module.exports = function partionCosts(costArray) {
	const cashArray = []
	const moneyArray = []
	const fourArray = []
	const sevenArray = []
	const tenArray = []

	for (let i = 0; i < costArray.length; i++) {
		if (i <= 2) {
			cashArray.push(costArray[i])
		} else if (i > 2 && i <= 3) {
			moneyArray.push(costArray[i])
		} else if (i > 3 && i <= 8) {
			fourArray.push(costArray[i])
		} else if (i > 8 && i <= 18) {
			sevenArray.push(costArray[i])
		} else {
			tenArray.push(costArray[i])
		}
	}

	return { cashArray, moneyArray, fourArray, sevenArray, tenArray }
}
