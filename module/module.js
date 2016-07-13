var fs = require('fs');

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
    

    var getAllItems = function() {
        var result = [];
        for (var i = 0; i < data.length; ++i) {
            result.push(data[i]);
        }
        return result;
    }; 

    var displayAllItems = function() {
        return getAllItems();   
    };

    var searchBysoname = function(soname){
        var result = [];
        for (var i = 0; i < data.length; ++i) {
            if(data[i].person.soname == soname){
                result.push(data[i]);
            }
        }
        return result;
    };
    var searchByapartmentNumber = function(apartmentNumber){
        var result = [];
        for (var i = 0; i < data.length; ++i) {
            if(data[i].person.adress.apartment == parseInt(apartmentNumber)){
                result.push(data[i]);
            }
        }
        return result;
    };
    var data = getDataFromFile(dbFilePath);
    return {
        getAllItems: getAllItems,
        displayAllItems: displayAllItems,
        searchBysoname:searchBysoname,
        searchByapartmentNumber:searchByapartmentNumber
    };

})();
