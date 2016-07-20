var module = require('./../module/module.js');

module.exports = (function () {
    var searchRecord = function (params) {
        
        var data = [];
        
        if (params.limit && parseInt(params.offset) > -1) {
          var result = [];
          for (var i = params.offset; i < (parseInt(params.offset) + parseInt(params.limit)); ++i) {
            if (data[i]) {
              result.push(data[i]);
            }            
          }
          data = result;
        }
        return data;
    };
    
    
    
    return {
        searchRecord: searchRecord        
    };
})();