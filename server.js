var express 	= require('express');
var app 		= express();
var port 		= process.env.PORT || 3000;
var morgan 		= require('morgan');
var assert 		= require('assert');
var mongoose	= require('mongoose');
var mongojs 	= require('mongojs');
var db 			= mongojs('contactlist', ['contactlist']);
var newdb		= mongojs('newlistdb', ['newlistdb']);
var bodyParser 	= require('body-parser');
var router 		= express.Router();
var appRoutes	= require('./app/routes/api')(router);
var path 		= require('path');

// mongodb coonection
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost:27017/usersdb', function(err){
	if (err) {
		console.log('Not connected to the database: ' + err);
	} else {
		console.log('Successfully connected to MongoDB');
	}
});

// middleware
app.use(morgan('dev')); 							// 1 Start login or request
app.use(bodyParser.json());							// 2 Start parsing the data
app.use(bodyParser.urlencoded({ extended: true })); // 2 --//--
app.use(express.static(__dirname + "/public/"));
app.use('/api', appRoutes);							// 3 Use the routes
//	    '/api' - for backend routes

// Перенаправление на index.html что бы не ввел пользователь
// app.get('*', function(req, res){
// 	res.sendFile(path.join(__dirname + "views/home.html"));
// });

// Main Contacts List
	// Получение списка с записями
	app.get('/contactlist', function(req, res){
		console.log("I received a GET request");

		db.contactlist.find(function(err, docs){
			console.log(docs);
			res.json(docs);
		});
	});

	// Добавление записи к списку
	app.post('/contactlist', function(req, res){
		if (req.body._id == undefined) {
			db.contactlist.insert(req.body, function(err, doc){
				res.json(doc);
			})
		}else{
			var ObjectID = require('mongodb').ObjectID;

			req.body._id = new ObjectID();

			db.contactlist.insert(req.body, function(err, doc){
				res.json(doc);
			})
		}
	});

	// Удаление записи из списка
	app.delete('/contactlist/:id', function(req, res){
		var id = req.params.id;
		db.contactlist.remove({_id: mongojs.ObjectId(id)}, function(err, doc){
			res.json(doc);
		})
	});

	// Получение данных конкретной записи
	app.get('/contactlist/:id', function(req, res){
		var id = req.params.id;
		db.contactlist.findOne({_id: mongojs.ObjectId(id)}, function(err, doc){
			res.json(doc);
		})
	});

	// Редактирование уже имеющейся записи
	app.put('/contactlist/:id', function(req, res){
		var id = req.params.id;
		db.contactlist.findAndModify(
		{
			query: {_id: mongojs.ObjectId(id)},
			update: {$set: {name: req.body.name, email: req.body.email, number: req.body.number}},
			new: true
		}, function(err, doc){
			res.json(doc);
		});
	});


// New Contacts List
	// Получение списка с записями
	app.get('/newlistdb', function(req, res){
		console.log("I received a GET request from newlistdb");

		newdb.newlistdb.find(function(err, docs){
			console.log(docs);
			res.json(docs);
		});
	});
	// Добавление записи к списку
	app.post('/newlistdb', function(req, res){
		if (req.body._id == undefined) {
			newdb.newlistdb.insert(req.body, function(err, doc){
				res.json(doc);
			})
		}else{
			var ObjectID = require('mongodb').ObjectID;

			req.body._id = new ObjectID();

			newdb.newlistdb.insert(req.body, function(err, doc){
				res.json(doc);
			})
		}
	});
	// Удаление записи из списка
	app.delete('/newlistdb/:id', function(req, res){
		var id = req.params.id;
		newdb.newlistdb.remove({_id: mongojs.ObjectId(id)}, function(err, doc){
			res.json(doc);
		})
	});

	// Получение данных конкретной записи
	app.get('/newlistdb/:id', function(req, res){
		var id = req.params.id;
		newdb.newlistdb.findOne({_id: mongojs.ObjectId(id)}, function(err, doc){
			res.json(doc);
		})
	});

	// Редактирование уже имеющейся записи
	app.put('/newlistdb/:id', function(req, res){
		var id = req.params.id;
		newdb.newlistdb.findAndModify(
		{
			query: {_id: mongojs.ObjectId(id)},
			update: {$set: {name: req.body.name, email: req.body.email, number: req.body.number}},
			new: true
		}, function(err, doc){
			res.json(doc);
		});
	});

	app.post('/newlistdb/', function(req, res){
		
			var ObjectID = require('mongodb').ObjectID;

			req.body._id = new ObjectID();

			newdb.newlistdb.insert(req.body, function(err, doc){
				res.json(doc);
			});
		
	});



app.listen(port, function(){
	console.log("Server running on port " + port);
});