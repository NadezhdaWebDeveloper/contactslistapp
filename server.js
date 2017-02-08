var express 	= require('express'),
	app 		= express(),
	port 		= process.env.PORT || 3000,
	morgan 		= require('morgan'),
	assert 		= require('assert'),
	mongoose	= require('mongoose'),
	mongojs 	= require('mongojs'),
	db 			= mongojs('spadb', ['contacts']),
	bodyParser 	= require('body-parser'),
	router 		= express.Router(),
	appRoutes	= require('./app/routes/api')(router),
	path 		= require('path');

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
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public/"));
app.use('/api', appRoutes);

app.get('/spadb', function(req, res){
	db.contacts.find(function(err, docs){
		console.log(docs);
		res.json(docs);
	});
});

app.post('/spadb', function(req, res){
	if (req.body._id == undefined) {
		db.contacts.insert(req.body, function(err, doc){
			res.json(doc);
		})
	}else{
		var ObjectID = require('mongodb').ObjectID;

		req.body._id = new ObjectID();

		db.contacts.insert(req.body, function(err, doc){
			res.json(doc);
		})
	}
});

app.delete('/spadb/:id', function(req, res){
	var id = req.params.id;
	db.contacts.remove({_id: mongojs.ObjectId(id)}, function(err, doc){
		res.json(doc);
	})
});

app.get('/spadb/:id', function(req, res){
	var id = req.params.id;
	db.contacts.findOne({_id: mongojs.ObjectId(id)}, function(err, doc){
		res.json(doc);
	})
});

app.put('/spadb/:id', function(req, res){
	var id = req.params.id;
	db.contacts.findAndModify(
	{
		query: {_id: mongojs.ObjectId(id)},
		update: {$set: {name: req.body.name, email: req.body.email, number: req.body.number}},
		new: true
	}, function(err, doc){
		res.json(doc);
	});
});

app.listen(port, function(){
	console.log("Server running on port " + port);
});