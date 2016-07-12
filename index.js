var bodyParser = require("body-parser");
var express = require('express');
var app = express();
var appView = require('./module/appView.js');
var module = require('./module/module.js');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.set('port', (process.env.PORT || 3000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
  res.render('pages/index')
});
app.get('/all', function (req, res) {
	res.send(appView.displayAllItems(req.query));
});
app.get('/db/:id', function(req, res) {
  var data = appView.displayAllItems(req.query);
  res.render('pages/db', {ide: req.params.id, data:data});
});


app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});