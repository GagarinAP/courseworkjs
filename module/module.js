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
    var data = getDataFromFile(dbFilePath);
    
    function displayAll() {
        var result = [];
        for (var i = 0; i < data.length; ++i) {
            result.push(data[i]);
        }        
        return result;
    };  
    
    function displayId(id) {
        var result = [];
        for (var i = 0; i < data.length; ++i) {
            if(data[i].id == parseInt(id)){
                result.push(data[i]);
            }
        }        
        return result;  
    }; 

    return {
        displayAll: displayAll,
        displayId: displayId
    };

})();
