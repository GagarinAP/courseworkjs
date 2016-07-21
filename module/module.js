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
    
    
    var getAverageOfGasAll = function(){
      var result = [];  
      for (var i = 0; i < data.length; ++i) {
        for (var j = 0; j < Object.keys(data[i].cost.gas).length; ++j) {                 
          result.push(parseInt(_.sum(data[i].cost.gas[j]) / Object.keys(data[i].cost.gas).length));
        }
      }
      return result;               
    };
    var getAverageOfEnergyAll = function(){
      var result = [];  
      for (var i = 0; i < data.length; ++i) {
        for (var j = 0; j < Object.keys(data[i].cost.energy).length; ++j) {                 
          result.push(parseInt(_.sum(data[i].cost.energy[j]) / Object.keys(data[i].cost.energy).length));
        }
      }
      return result;               
    };
    var getAverageOfWatherColdAll = function(){
      var result = [];  
      for (var i = 0; i < data.length; ++i) {
        for (var j = 0; j < Object.keys(data[i].cost.wather.cold).length; ++j) {                 
          result.push(parseInt(_.sum(data[i].cost.wather.cold[j]) / Object.keys(data[i].cost.wather.cold).length));
        }
      }
      return result;               
    };
    var getAverageOfWatherHotAll = function(){
      var result = [];  
      for (var i = 0; i < data.length; ++i) {
        for (var j = 0; j < Object.keys(data[i].cost.wather.hot).length; ++j) {                 
          result.push(parseInt(_.sum(data[i].cost.wather.hot[j]) / Object.keys(data[i].cost.wather.hot).length));
        }
      }
      return result;               
    };

    var getAverageOfGasPerson = function(id){        
      var result = [];     
      for (var i = 0; i < data.length; ++i) {
        for (var j = 0; j < Object.keys(data[i].cost.gas).length; ++j) {
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
        for (var j = 0; j < Object.keys(data[i].cost.energy).length; ++j) {
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
        for (var j = 0; j < Object.keys(data[i].cost.wather.cold).length; ++j) {
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
        for (var j = 0; j < Object.keys(data[i].cost.wather.hot).length; ++j) {
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
        for (var j = 0; j < Object.keys(data[i].cost.date.month).length; ++j) {
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
      var labels = [],            
          dataStat = [],            
          backGroundColors = [],            
          borderColors = [];
            
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
            yAxes: [
              {
                ticks: {
                  beginAtZero:true
                }
              }
            ]
          }                  
        }
      };  
    };
    var getChartDataEnergy = function () {
      var userlist = displayAll();            
      var averageEnergyAll = getAverageOfEnergyAll(); 

      var labels = [],           
          dataStat = [],            
          backGroundColors = [],            
          borderColors = [];
            
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
            yAxes: [
              {
                ticks: {
                beginAtZero:true
                }
              }
            ]
          }                  
        }
      };  
    };
    var getChartDataWather = function () {
      var userlist = displayAll();            
      var averageOfWatherColdAll = getAverageOfWatherColdAll();
      var averageOfWatherHotAll = getAverageOfWatherHotAll();
            
      var labels = [],            
          dataStatCold = [],
          dataStatHot = [],
          backGroundColorsCold = [],
          backGroundColorsHot = [],
          borderColorsCold = [],
          borderColorsHot = [];

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
            yAxes: [
              {
                ticks: {
                  beginAtZero:true
                }
              }
            ]
          }                  
        }
      };  
    };

    var getChartDataIdGas = function (id) {                      
      var averageOfGasPerson = getAverageOfGasPerson(id);
      var dateOfPerson = getDateOfPerson(id);

      var labels = [],
          dataStat = [],
          backGroundColors = [],
          borderColors = [];

      for (var i = 0; i < 12; ++i) {
        labels.push(dateOfPerson[i]);                               
        dataStat.push(averageOfGasPerson[i]);                
        backGroundColors.push('rgba(0, 127, 255, 0.3)');                
        borderColors.push('rgba(0, 0, 0, 1)');
      }

      return {
        type: "bar",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Газ",
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
            yAxes: [
              {
                ticks: {
                  beginAtZero:true
                }
              }
            ]
          }                  
        }
      };  
    };
    var getChartDataIdEnergy = function (id) {                      
      var averageOfEnergyPerson = getAverageOfEnergyPerson(id);
      var dateOfPerson = getDateOfPerson(id);

      var labels = [],
          dataStat = [],
          backGroundColors = [],
          borderColors = [];
            
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
              label: "Електроенергія",
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
            yAxes: [
              {
                ticks: {
                  beginAtZero:true
                }
              }
            ]
          }                  
        }
      };  
    };
    var getChartDataIdWather = function (id) {                      
      var averageOfWatherColdPerson = getAverageOfWatherColdPerson(id);
      var averageOfWatherHotPerson = getAverageOfWatherHotPerson(id);
      var dateOfPerson = getDateOfPerson(id);

      var labels = [],
          dataStatCold = [],
          dataStatHot = [],
          backGroundColorsCold = [],
          backGroundColorsHot = [],
          borderColorsCold = [],
          borderColorsHot = [];
            
      for (var i = 0; i < 12; ++i) {
        labels.push(dateOfPerson[i]);                               
        dataStatCold.push(averageOfWatherColdPerson[i]);  
        dataStatHot.push(averageOfWatherHotPerson[i]);              
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
            yAxes: [
              {
                ticks: {
                  beginAtZero:true
                }
              }
            ]
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

    var addRecordDate = function (record) {
      var isOk = addRecord(record);
      return (isOk) ? { success: true } : { success: false };
    };

    var prepareRecord = function (params) {            
      var result = {};            
            
      var userId = getIdByUser();            
      var person = getPersonByNameAndSoname(params.name, params.soname);            
      var adress = getAdressByTownStreetNumberAndApartment('Rivne','Mickevich','32',params.appartment);
      var date = getCostByDate();
      var wather = getCostByWather();  
      var cost = getCostByGasAndEnergy();
            
      result = userId;
      result.person = person;                       
      result.person.adress = adress;
      result.cost = cost;
      result.cost.date = date;
      result.cost.wather = wather;           
                
      return result;
    };
    var getIdByUser = function () {
      var result = {};
      var key = data.length-1;
      for(var i = 0; i < data.length; ++i) {
        if (data[i].id === key) {
          result = data[i].id;
        }
      }
      result = {
        id: ++key                
      };
      return result;
    };
    var validateParams = function (params) {
      return (
        (params.name && params.name.match(/^(.*[a-zA-Z ])$/)) &&
        (params.soname && params.soname.match(/^(.*[a-zA-Z ])$/)) && 
        (params.appartment && params.appartment.match(/[0-9]/)) 
      );
    };
    var getAdressByTownStreetNumberAndApartment = function (town,street,number,apartment) {
      var result = null;
      for(var i = 0; i < data.length; ++i) {
        if (data[i].person.adress.town === town && 
            data[i].person.adress.street === street && 
            data[i].person.adress.number === number && 
            data[i].person.adress.apartment === apartment) {
          result = data[i].person.adress;
        }
      }
      if (result) {
        return result;
      }           
      result = {
        town: town,
        street: street,
        number: number,
        apartment: apartment
      };
      return result;
    };        
        
    var getPersonByNameAndSoname = function (name,soname) {
      var result = null;
      for(var i = 0; i < data.length; ++i) {
        if (data[i].person.name === name && data[i].person.soname === soname) {
          result = data[i].person;
        }
      }
      if (result) {
        return result;
      }           
      result = {                
        name: name,
        soname: soname
      };
      return result;
    };

    var getCostByDate = function(){
      var result = null; 
      var year = {"0":"2015"};         
      var month = {"0":"1","1":"2","2":"3","3":"4","4":"5","5":"6","6":"7","7":"8","8":"9","9":"10","10":"11","11":"12"};
      for(var i = 0; i < data.length; ++i) {
        if (data[i].cost.date === month && data[i].cost.date === year) {
          result = data[i].cost.date;
        }
      }
      if (result) {
        return result;
      }           
      result = {
        year: year,                
        month: month
      };
      return result;
    };  
    
    var getCostByWather = function(){
      var result = null; 
      var cold = {"0":"0","1":"0","2":"0","3":"0","4":"0","5":"0","6":"0","7":"0","8":"0","9":"0","10":"0","11":"0"};       
      var hot = {"0":"0","1":"0","2":"0","3":"0","4":"0","5":"0","6":"0","7":"0","8":"0","9":"0","10":"0","11":"0"};
      for(var i = 0; i < data.length; ++i) {
        if (data[i].cost.wather === cold && data[i].cost.wather === hot) {
          result = data[i].cost.wather;
        }
      }
      if (result) {
        return result;
      }           
      result = {
        cold: cold,                
        hot: hot
      };
      return result;
    };  
    
    var getCostByGasAndEnergy = function(){
      var result = null;          
      var arr = {"0":"0","1":"0","2":"0","3":"0","4":"0","5":"0","6":"0","7":"0","8":"0","9":"0","10":"0","11":"0"};
      for(var i = 0; i < data.length; ++i) {
        if (data[i].cost.gas === arr && data[i].cost.energy === arr) {
          result = data[i].cost;
        }
      }
      if (result) {
        return result;
      }            
      result = {                
        gas: arr,
        energy: arr
      };
      return result;
    };        

    var addRecord = function (record) {            
      if (!validateParams(record)) {        
        return null;
      }
      data.push(prepareRecord(record));            
      try {
        fs.writeFileSync(
          dbFilePath, 
          JSON.stringify(data), 
          { flag: 'w+' }
        );   
        data = getDataFromFile(dbFilePath);
      } catch(e) {
        return false;
      }
      return true;
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
        getAverageOfGasPerson: getAverageOfGasPerson,
        addRecord: addRecord,
        addRecordDate: addRecordDate
    };

})();
