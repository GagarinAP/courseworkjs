var keysModule = require('./../module/module.js');
var colors = require('colors');

module.exports = (function () {
    var test1 = function () {        
        console.log("Test 1: displayAll");
        var actualResult = keysModule.displayAll();        
        if (actualResult.length === 27) {
            console.log("[Passed]".green);
            return true;            
        } else {
            console.log("[Failed] :keysModule.displayAll should return list with 27 element from data.json".red);
            return false;
        }
    };
    
    var test2 = function () {
        console.log("Test 2: displayPerson");
        var actualResult = keysModule.displayPerson('Gagarin');        
        if (actualResult.length === 0) {
            console.log("[Passed]".green);
            return true;            
        } else {
            console.log("[Failed] :keysModule.displayPerson should return 0 elements".red);
            return false;
        }
    };
    
    var test3 = function () {
        console.log("Test 3: getChartDataGas");
        var actualResult = keysModule.getChartDataGas();        
        if (typeof actualResult === 'object') {
            console.log("[Passed]".green);
            return true;            
        } else {
            console.log("[Failed] :keysModule.getChartDataGas should return object".red);
            return false;
        }
    };
    
    var test4 = function () {
        console.log("Test 4: getChartDataEnergy");        
        var actualResult = keysModule.getChartDataEnergy();
        if (typeof actualResult === 'object') {
            console.log("[Passed]".green);
            return true;            
        } else {
            console.log("[Failed] :keysModule.getChartDataEnergy should return object".red);
            return false;
        }
    };   
    var test5 = function () {
        console.log("Test 5: getChartDataWather");        
        var actualResult = keysModule.getChartDataWather();
        if (typeof actualResult === 'object') {
            console.log("[Passed]".green);
            return true;            
        } else {
            console.log("[Failed] :keysModule.getChartDataWather should return object".red);
            return false;
        }
    }; 
    var test6 = function () {
        console.log("Test 6: getChartDataIdGas");        
        var actualResult = keysModule.getChartDataIdGas(5);         
        if (typeof actualResult === 'object') {
            console.log("[Passed]".green);
            return true;            
        } else {
            console.log("[Failed] :keysModule.getChartDataIdGas should return object".red);
            return false;
        }
    };
    var test7 = function () {
        console.log("Test 7: getChartDataIdEnergy");        
        var actualResult = keysModule.getChartDataIdEnergy(4);
        if (typeof actualResult === 'object') {
            console.log("[Passed]".green);
            return true;            
        } else {
            console.log("[Failed] :keysModule.getChartDataIdEnergy should return object".red);
            return false;
        }
    };
    var test8 = function () {
        console.log("Test 8: getChartDataIdWather");        
        var actualResult = keysModule.getChartDataIdWather(3);
        if (typeof actualResult === 'object') {
            console.log("[Passed]".green);
            return true;            
        } else {
            console.log("[Failed] :keysModule.getChartDataIdWather should return object".red);
            return false;
        }
    };
    var test9 = function () {
        console.log("Test 9: searchByCustomer");       
        var actualResult = keysModule.searchByCustomer('Gagarin');        
        if (actualResult.length === 1) {
            console.log("[Passed]".green);
            return true;            
        } else {
            console.log("[Failed] :keysModule.searchByCustomer should return 1 element".red);
            return false;
        }
    };
    var test10 = function () {
        console.log("Test 10: getAverageOfGasAll");        
        var actualResult = keysModule.getAverageOfGasAll();        
        if (actualResult.length === 324) {
            console.log("[Passed]".green);
            return true;            
        } else {
            console.log("[Failed] :keysModule.getAverageOfGasAll should return list with 324 elements".red);
            return false;
        }
    };
    var test11 = function () {
        console.log("Test 11: getAverageOfGasPerson");        
        var actualResult = keysModule.getAverageOfGasPerson(5);        
        if (actualResult.length === 12) {
            console.log("[Passed]".green);
            return true;            
        } else {
            console.log("[Failed] :keysModule.getAverageOfGasPerson should return 12 elements".red);
            return false;
        }
    };
    var test12 = function () {
        console.log("Test 12: addRecord");        
        var actualResult = keysModule.addRecord('fdvdf','sdfsds',555);              
        if (actualResult === null) {
            console.log("[Passed]".green);
            return true;            
        } else {
            console.log("[Failed] :keysModule.addRecord should return null".red);
            return false;
        }
    };
    var test13 = function () {
        console.log("Test 13: addRecordDate");              
        var actualResult = keysModule.addRecordDate('fdvdf','sdfsds', 555);        
        if (actualResult.success === false) {
            console.log("[Passed]".green);
            return true;            
        } else {
            console.log("[Failed] :keysModule.addRecordDate should return false".red);
            return false;
        }
    };
    return {
      test1: test1,
      test2: test2,
      test3: test3,
      test4: test4,
      test5: test5, 
      test6: test6,
      test7: test7,
      test8: test8,
      test9: test9,
      test10: test10,
      test11: test11,
      test12: test12,
      test13: test13  
    };    
})();