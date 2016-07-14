var module = require('./../module/module.js');

module.exports = (function () {

	var displayAll = function() {
		return module.displayAll();
	};
	var displayId = function(params) {
		if (params.id) {
			return module.displayId(params.id);
		}else{
			console.log('Empty views');
		}
	};
	
	return {
		displayAll: displayAll,
		displayId: displayId
	};

})();