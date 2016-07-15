var fs = require('fs');
var _ = require('lodash');

module.exports = (function () {

    var dbFilePath = './data/data.json';
    var getDataFromFile = function (path) {
        try {
            var result = fs.readFileSync(path, 'utf8');
            return JSON.parse(result);
        } catch(e) {           
            return [];
        }
    };
    
    var data = getDataFromFile(dbFilePath);

    var displayAll = function() {
        var result = [];
        for (var i = 0; i < data.length; ++i) {
            result.push(data[i]);
        }        
        return result;
    };  
    
    var displayId = function(id) {
        var result = [];
        for (var i = 0; i < data.length; ++i) {
            if(data[i].id == parseInt(id)){
                result.push(data[i]);
            }
        }        
        return result;  
    }; 

    var getUserList = function(){
        var result = [];
        for (var i = 0; i < data.length; ++i) {
            result.push(data[i].person.soname);
        }   
        return result;
    };    
    var getAverageOfGas = function(){
        var result = [];
        for (var i = 0; i < data.length; ++i) {
            for (var j = 0; j < 12; ++j) {        
                result.push(_.sum(data[i].cost.gas[j]) / 12);
            }            
        }               
        return result;
    };

    var getChartData = function () {
            var userlist = displayAll();
            var appartments = getAverageOfGas();
            var labels = [];
            var dataStat = [];
            var backGroundColors = [];
            var borderColors = [];
            for (var i = 0; i < userlist.length; ++i) {
                labels.push(userlist[i].person.name);                
                dataStat.push(appartments[i]); 
                backGroundColors.push('rgba(83, 47, 140, 0.3)');
                borderColors.push('rgba(0, 0, 0, 1)');
            }

            return {
              type: "bar",
              data: {
                  labels: labels,
                  datasets: [
                      {
                          label: "Gas",
                          data: dataStat,
                          backgroundColor: backGroundColors,
                          borderColor: borderColors,
                          borderWidth: 1
                      }
                  ]
              },
              options: {
                  responsive: true,
                  scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero:true
                            }
                        }]
                    }                  
              }
            };  
    };

    

    return {
        displayAll: displayAll,
        displayId: displayId,
        getChartData:getChartData
    };

})();
