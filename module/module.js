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
    var getUserDate = function(id){      
        var result = [];
        for (var i = 0; i < 12; ++i) {
            result.push(data[id].cost.date.year[0] + '.' + data[id].cost.date.month[i]);
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

    
    var getAverageOfGasId = function(id){
        var result = [];
        
            for (var j = 0; j < 12; ++j) {        
                result.push(data[id].cost.gas[j]);
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
                labels.push(userlist[i].person.soname);                
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

    var getChartData1 = function (id) {
        //var id = location.search.split('id=')[1];
            var userdate = getUserDate(id);
            var appartments = getAverageOfGasId(id);
            var labels = [];
            var dataStat = [];
            var backGroundColors = [];
            var borderColors = [];
            for (var i = 0; i < userdate.length; ++i) {
                labels.push(userdate[i]);                               
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
        getChartData:getChartData,
        getChartData1:getChartData1
    };

})();
