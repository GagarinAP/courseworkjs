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
    var displayAll = function() {
      var result = [];      
      
        for (var i = 0; i < data.length; ++i) {
          result.push(data[i]);
        }        
        return result;
      
    };  

    var displayPerson = function(id) {
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
    
    //Функція приймає параметр та видає массив значень газу по заданому користувачу
    //або параметр відсутній то видає массив середніх значень газу по всіх користувачах;
    var getAverageOfGasAll = function(){
         
      var result = [];  
      for (var i = 0; i < data.length; ++i) {
        for (var j = 0; j < 12; ++j) {                 
          result.push(parseInt(_.sum(data[i].cost.gas[j]) / 12));
        }
      }
        return result;
               
    };
    var getAverageOfEnergyAll = function(){
         
      var result = [];  
      for (var i = 0; i < data.length; ++i) {
        for (var j = 0; j < 12; ++j) {                 
          result.push(parseInt(_.sum(data[i].cost.energy[j]) / 12));
        }
      }
        return result;
               
    };
    var getAverageOfWatherColdAll = function(){
         
      var result = [];  
      for (var i = 0; i < data.length; ++i) {
        for (var j = 0; j < 12; ++j) {                 
          result.push(parseInt(_.sum(data[i].cost.wather.cold[j]) / 12));
        }
      }
        return result;
               
    };
    var getAverageOfWatherHotAll = function(){
         
      var result = [];  
      for (var i = 0; i < data.length; ++i) {
        for (var j = 0; j < 12; ++j) {                 
          result.push(parseInt(_.sum(data[i].cost.wather.hot[j]) / 12));
        }
      }
        return result;
               
    };

    var getAverageOfGasPerson = function(id){        
      var result = [];     
        for (var i = 0; i < data.length; ++i) {
          for (var j = 0; j < 12; ++j) {
            if(data[i].id == parseInt(id)) {               
              result.push(data[i].cost.gas[j]);
            }
          }
        }
        return result;               
    };
    var getAverageOfEnergyPerson = function(id){        
      var result = [];     
        for (var i = 0; i < data.length; ++i) {
          for (var j = 0; j < 12; ++j) {
            if(data[i].id == parseInt(id)) {               
              result.push(data[i].cost.energy[j]);
            }
          }
        }
        return result;               
    };
    var getAverageOfWatherColdPerson = function(id){        
      var result = [];     
        for (var i = 0; i < data.length; ++i) {
          for (var j = 0; j < 12; ++j) {
            if(data[i].id == parseInt(id)) {               
              result.push(data[i].cost.wather.cold[j]);
            }
          }
        }
        return result;               
    };
    var getAverageOfWatherHotPerson = function(id){        
      var result = [];     
        for (var i = 0; i < data.length; ++i) {
          for (var j = 0; j < 12; ++j) {
            if(data[i].id == parseInt(id)) {               
              result.push(data[i].cost.wather.hot[j]);
            }
          }
        }
        return result;               
    };
    var getDateOfPerson = function(id){        
      var result = [];        
        for (var i = 0; i < data.length; ++i) {
          for (var j = 0; j < 12; ++j) {
            if(data[i].id == parseInt(id)) {               
              result.push(data[i].cost.date.year[0]+'.'+data[i].cost.date.month[j]);
            }
          }
        }
        return result;               
    };

    var getChartDataGas = function () {
            var userlist = displayAll();
            var averageGasAll = getAverageOfGasAll();            
            var labels = [];            
            var dataStat = [];            
            var backGroundColors = [];            
            var borderColors = [];
            
            for (var i = 0; i < userlist.length; ++i) {
                labels.push(userlist[i].person.adress.apartment);                
                dataStat.push(averageGasAll[i]);                               
                backGroundColors.push('rgba(0, 127, 255, 0.3)');                
                borderColors.push('rgba(0, 0, 0, 1)');
            }            

            return {
              type: "bar",
              data: {
                  labels: labels,
                  datasets: [
                      {
                          label: "Витрати газу",
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
    var getChartDataEnergy = function () {
            var userlist = displayAll();            
            var averageEnergyAll = getAverageOfEnergyAll(); 

            var labels = [];            
            var dataStat = [];            
            var backGroundColors = [];            
            var borderColors = [];
            
            for (var i = 0; i < userlist.length; ++i) {
                labels.push(userlist[i].person.adress.apartment);               
                dataStat.push(averageEnergyAll[i]);                             
                backGroundColors.push('rgba(255, 243, 0, 0.3)');               
                borderColors.push('rgba(0, 0, 0, 1)');
            }            

            return {
              type: "bar",
              data: {
                  labels: labels,
                  datasets: [                      
                      {
                          label: "Витрати енергії",
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
    var getChartDataWather = function () {
            var userlist = displayAll();            
            var averageOfWatherColdAll = getAverageOfWatherColdAll();
            var averageOfWatherHotAll = getAverageOfWatherHotAll();
            var labels = [];            
            var dataStatCold = [];
            var dataStatHot = [];
            
            var backGroundColorsCold = [];
            var backGroundColorsHot = [];
            
            var borderColorsCold = [];
            var borderColorsHot = [];
            for (var i = 0; i < userlist.length; ++i) {
                labels.push(userlist[i].person.adress.apartment);               
                dataStatCold.push(averageOfWatherColdAll[i]);
                dataStatHot.push(averageOfWatherHotAll[i]);               
                backGroundColorsCold.push('rgba(0, 153, 203, 0.3)');
                backGroundColorsHot.push('rgba(221, 0, 0, 0.3)');               
                borderColorsCold.push('rgba(0, 153, 203, 1)');
                borderColorsHot.push('rgba(221, 0, 0, 1)');
            }            

            return {
              type: "bar",
              data: {
                  labels: labels,
                  datasets: [
                      {
                          label: "Холодна вода",
                          data: dataStatCold,
                          backgroundColor: backGroundColorsCold,
                          borderColor: borderColorsCold,
                          borderWidth: 1
                      },
                      {
                          label: "Гаряча вода",
                          data: dataStatHot,
                          backgroundColor: backGroundColorsHot,
                          borderColor: borderColorsHot,
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

    var getChartDataIdGas = function (id) {                      
            var averageOfGasPerson = getAverageOfGasPerson(id);
            var dateOfPerson = getDateOfPerson(id);

            var labels = [];
            var dataStat = [];
            var backGroundColors = [];
            var borderColors = [];

            for (var i = 0; i < 12; ++i) {
                labels.push(dateOfPerson[i]);                               
                dataStat.push(averageOfGasPerson[i]);                
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
    var getChartDataIdEnergy = function (id) {                      
            var averageOfEnergyPerson = getAverageOfEnergyPerson(id);
            var dateOfPerson = getDateOfPerson(id);

            var labels = [];
            var dataStat = [];
            var backGroundColors = [];
            var borderColors = [];
            
            for (var i = 0; i < 12; ++i) {
                labels.push(dateOfPerson[i]);                               
                dataStat.push(averageOfEnergyPerson[i]);                
                backGroundColors.push('rgba(255, 243, 0, 0.3)');
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
    var getChartDataIdWather = function (id) {                      
            var averageOfWatherColdPerson = getAverageOfWatherColdPerson(id);
            var averageOfWatherHotPerson = getAverageOfWatherHotPerson(id);
            var dateOfPerson = getDateOfPerson(id);

            var labels = [];
            var dataStatCold = [];
            var dataStatHot = [];
            var backGroundColorsCold = [];
            var backGroundColorsHot = [];
            var borderColorsCold = [];
            var borderColorsHot = [];
            
            for (var i = 0; i < 12; ++i) {
                labels.push(dateOfPerson[i]);                               
                dataStatCold.push(averageOfWatherColdPerson[i]);  
                dataStatHot.push(averageOfWatherHotPerson[i]);              
                backGroundColorsCold.push('rgba(83, 47, 140, 0.3)');
                backGroundColorsHot.push('rgba(83, 47, 140, 0.3)');
                borderColorsCold.push('rgba(0, 0, 0, 1)');
                borderColorsHot.push('rgba(0, 0, 0, 1)');
            }

            return {
              type: "bar",
              data: {
                  labels: labels,
                  datasets: [
                      {
                          label: "Холодна вода",
                          data: dataStatCold,
                          backgroundColor: backGroundColorsCold,
                          borderColor: borderColorsCold,
                          borderWidth: 1
                      },
                      {
                          label: "Гаряча вода",
                          data: dataStatHot,
                          backgroundColor: backGroundColorsHot,
                          borderColor: borderColorsHot,
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
        displayAll: displayAll, 
        displayPerson: displayPerson,       
        getChartDataGas: getChartDataGas,
        getChartDataEnergy: getChartDataEnergy,
        getChartDataWather: getChartDataWather,
        getChartDataIdGas: getChartDataIdGas,
        getChartDataIdEnergy: getChartDataIdEnergy,
        getChartDataIdWather: getChartDataIdWather,
        searchByCustomer: searchByCustomer,
        getAverageOfGasAll: getAverageOfGasAll,
        getAverageOfGasPerson: getAverageOfGasPerson
    };

})();
