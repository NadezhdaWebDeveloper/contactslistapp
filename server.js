var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('contactlist', ['contactlist']);
var bodyParser = require('body-parser');

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

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

app.listen(3000);
console.log("Server running on port 3000");