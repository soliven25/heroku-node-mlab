var express = require('express');
var MongoClient = require('mongodb').MongoClient, assert = require('assert');



var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.get('/insert', function(request, response) {
  response.render('pages/insert');
});

app.get('/process-menu', function(req, res){
	console.log('receive ' + req.query.firstname + ',' + req.query.lastname);


	// Connection URL
	//var url = 'mongodb://localhost:27017/myproject';
	//var url = 'mongodb://soliven25:m25892589@ds019268.mlab.com:19268/humanrsrc';
	var url = 'mongodb://soliven25:m25892589@ds011419.mlab.com:11419/heroku_613qh8ph';
	// Use connect method to connect to the Server

	MongoClient.connect(url, function(err, db) {

  	assert.equal(null, err);
  	console.log("Connected correctly to mlab server");

  	var collection = db.collection('menu');
  	collection.insert({fname: req.query.firstname, lname: req.query.lastname});

  	//db.close();
	});

	res.redirect(303, '/');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


/* mongodb connection */



