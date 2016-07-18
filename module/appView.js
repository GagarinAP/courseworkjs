var module = require('./module.js');

module.exports = (function () {
    var searchRecord = function (params) {
        // TODO: add serach by both params in a time
        if (params.name) {
            return module.searchByCustomer(params.name);
        } else if (params.worker_id) {
            return module.searchByWorker(params.worker_id);
        } else {
            return [];
        }
    };
    
   
    
    return {
        searchRecord: searchRecord        
    };
})();