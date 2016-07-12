var profitModule = require('./../module/module.js');

module.exports = (function () {

	var displayAllItems = function () {
		return profitModule.displayAllItems();
	}
	var SearchByApartment = function () {
		return profitModule.SearchByApartment();
	}

	return {
		displayAllItems: displayAllItems,
		SearchByApartment:SearchByApartment
	};

}) ();