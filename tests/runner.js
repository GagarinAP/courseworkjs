var _ = require('lodash');
var moduleTest = require('./moduleTest.js');

_.each(moduleTest, function (test) {
    test();    
});