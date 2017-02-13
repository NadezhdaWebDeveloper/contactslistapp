var express 	= require('express'),
	app 		= express(),
	port 		= process.env.PORT || 3000,
	assert 		= require('assert'),
	mongoose	= require('mongoose'),
	bodyParser 	= require('body-parser'),
	router 		= express.Router(),
	appRoutes	= require('./app/routes/api')(router);
	// path 		= require('path');

// mongodb coonection
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost:27017/spadb', function(err){
	if (err) {
		console.log('Not connected to the database: ' + err);
	} else {
		console.log('Successfully connected to MongoDB');
	}
});

// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public/"));
app.use('/api', appRoutes);


app.all('/*', function(req, res, next) {
    // Just send the index.html for other files to support HTML5Mode
    res.sendFile('index.html', { root: __dirname + "/public/"});
});

app.listen(port, function(){
	console.log("Server running on port " + port);
});