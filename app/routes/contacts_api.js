var Contact 	= require('../models/contact');

module.exports = function(router){

	// http://localhost:3000/contacts_api/contacts
	router.get('/contacts', function(req, res){

		Contact.find(function(err, contacts){
			if (err)
				res.send(err);

			res.send(contacts);
		});
	});

	// http://localhost:3000/contacts_api/contact
	router.post('/contact', function(req, res){

		var contact = new Contact();

		contact.name = req.body.name;
		contact.email = req.body.email;
		contact.number = req.body.number;

		if (req.body.name == null || req.body.name == ''
			|| req.body.email == null || req.body.email == ''
			|| req.body.number == null || req.body.number == '') {
			res.json({ success: false, message: 'Ensure contact\'s name, contact\'s email and contact\'s number were provided.' });
		} else {
			contact.save(function(err, contact){
				if (err) {
					res.json({ success: false, message: 'Contact\'s email or contact\'s number already exist! Try again.' });
				} else {
					res.json({ success: true, message: 'Contact created!', data: contact });
				}
			});
		}
	});

	// http://localhost:3000/contacts_api/contact/id
	router.delete('/contact/:id', function(req, res){

		Contact
			.remove({
				_id: req.params.id
			}, function(err, contact) {
				if (err)
					res.json({ success: false, message: 'Error!'});

				res.json({ success: true, message: 'Contact deleted'});
			});
	});

	// http://localhost:3000/contacts_api/contact/id
	router.get('/contact/:id', function(req, res){

		Contact
			.findOne({
				_id: req.params.id
			}, function(err, contact) {
				if (err) { return res.send(err); }
				else{
					res.json({ success: true, message: 'get contact!', data: contact });
				}
			});
	});

	// http://localhost:3000/contacts_api/contact/id
	router.delete('/contact/:id', function(req, res){

		Contact
			.remove({
				_id: req.params.id
			}, function(err, contact) {

				if (err) { return res.send(err); }
				else{
					res.json({ success: true, message: 'Contact deleted'});
				}
			});
	});

	// http://localhost:3000/contacts_api/contact/id
	router.put('/contact/:id', function(req, res){

		Contact
			.findOne({
				_id: req.body._id
			}, function(err, contact) {

				if (err) { return res.send(err); }

				for (prop in req.body) {
					contact[prop] = req.body[prop];
				}

				contact.save(function(err, contact){
					if (err) { return res.send(err); }
					
					res.json({ success: true, message: 'Coontact updated', data: contact });
				});
			});
	});

	return router;
}