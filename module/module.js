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
    //Функція приймає параметр та видає массив данних користувача
    //або параметр відсутній то видає массив всіх користувачів;
    var displayAllId = function(ida) {
      var result = [];      
      if(ida === undefined){
        for (var i = 0; i < data.length; ++i) {
          result.push(data[i]);
        }        
        return result;
      } else {
        for (var i = 0; i < data.length; ++i) {
          if(data[i].id == parseInt(ida)){
            result.push(data[i]);
          }
        }        
        return result;
      }
    };    

    var getUserList = function(){
      var result = [];
      for (var i = 0; i < data.length; ++i) {
        result.push(data[i].person.soname);
      }   
      return result;
    };   
    
    //Функція приймає параметр та видає массив значень газу по заданому користувачу
    //або параметр відсутній то видає массив середніх значень газу по всіх користувачах;
    var getAverageOfGas = function(id){
      var resultaver = [];    
      var result = [];  
      if(id == undefined){
        for (var i = 0; i < data.length; ++i) {
            for (var j = 0; j < 12; ++j) {        
                resultaver.push((_.sum(data[i].cost.gas[j])) / 12);
            }            
        }               
        return resultaver;
      } else {
        for (var i = 0; i < 12; ++i) {
          //console.log(data[parseInt(id)].cost.gas.length);        
          result.push(data[id].cost.gas[i]);
        }
        return result;
      }          
    };

    var getChartData = function (id) {
            var userlist = displayAllId(id);
            var appartments = getAverageOfGas(id);
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

    var getChartDataId = function (id) {            
            var appartments = getAverageOfGas(id);
            var labels = [];
            var dataStat = [];
            var backGroundColors = [];
            var borderColors = [];
            for (var i = 0; i < 12; ++i) {
                labels.push(data[id].cost.date.year[0]+'.'+data[id].cost.date.month[i]);                               
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

    var searchByCustomer = function(name){
      var result = [];
      if(name == parseInt(name)){
        for(var i = 0; i < data.length; ++i) {
          if(data[i].person.adress.apartment == name) {
            result.push(data[i]);
          }
        }
        return result;
      } else {   
        for(var i = 0; i < data.length; ++i) {
          if(data[i].person.soname == name) {
            result.push(data[i]);
          }
        }
        return result;
      }
    };
    

    return {
        displayAllId: displayAllId,        
        getChartData:getChartData,
        getChartDataId:getChartDataId,
        searchByCustomer: searchByCustomer
    };

})();
