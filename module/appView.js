var module = require('./module.js');

module.exports = (function () {

	/*var displayAll = function() {
		return module.displayAll();
	};
	var displayId = function() {		
		return module.displayId(params.id);*/		
	//};
	var getChartData = function () {
        	var appartments = module.getUserList();
            var appartmentsStat = module.getAppartmentsList()
            var labels = [];
            var dataStat = [];
            var backGroundColors = [];

            for (var i = 0; i < appartments.length; ++i) {
                labels.push(appartments[i].person.soname);
                dataStat.push(appartmentsStat[i].person.adress.apartment); 
                backGroundColors.push('rgba(0, 255, 0, 0.8)');
            }

            return {
              type: "bar",
              data: {
                  labels: labels,
                  datasets: [
                      {
                          label: "Datasheet 1",
                          data: dataStat,
                          backgroundColor: backGroundColors
                      }
                  ]
              },
              options: {
                  responsive: true,                  
              }
            };  
    };
	
	return {
		/*displayAll: displayAll,
		displayId: displayId,*/
		getChartData: getChartData
	};

})();