const axios = require('axios').default;

(async () => {
	const res = await axios('https://www.monogo.pl/competition/input.txt');
	const filters = res.data.selectedFilters;
	const colors = res.data.colors;
	const sizes = res.data.sizes;
	let group = res.data.products.map(product => {
		 let foundSize = sizes.find(size => size.id == product.id)
		let foundColor = colors.find(color => color.id == product.id);

		 return ({id : product.id, color: foundColor.value, price: product.price, size : foundSize.value})
	});

	let filteredGroup = group.filter(v =>
		filters.colors.indexOf(v.color) >= 0 && filters.sizes.indexOf(v.size) >= 0 && v.price > 200
	)

	let min = Infinity;
	let max = 0;

	filteredGroup.forEach(v => {
		min = Math.min(min, v.price);
		max = Math.max(max, v.price)
	})

	let num = Math.round(min * max);
	let numStr = num.toString().split('')

	let resArr = []
	for (let i = 0; i <= numStr.length - 2 ; i += 2) {
		resArr.push(parseInt(numStr[i]) + parseInt(numStr[i +1]))
	}

	let monogoStreetNumber = 14;
	let index = resArr.indexOf(monogoStreetNumber);
	const finalResult = index * num * "Monogo".length;
	console.log(finalResult);
})();
