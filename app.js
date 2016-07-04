var express = require('express');
var bodyParser = require("body-parser");
var app = express();


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.set('port',3000);


app.listen(3000, function () {
  console.log('Application is run localhost:' + app.get('port'));
});