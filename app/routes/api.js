var User 		= require('../models/user'),
	Contact 	= require('../models/contact'),
	jwt			= require('jsonwebtoken'),
	secret 		= 'gamesofthrones';

module.exports = function(router){

	// http://localhost:3000/api/contacts
	router.get('/contacts', function(req, res){

		Contact.find(function(err, contacts){
			if (err)
				res.send(err);

			res.send(contacts);
		});
	});

	// http://localhost:3000/api/contact
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

	// http://localhost:3000/api/contact/id
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

	// http://localhost:3000/api/contact/id
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

	// http://localhost:3000/api/contact/id
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

	// http://localhost:3000/api/contact/id
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





	// USER REGISTRATION ROUTE
	// http://localhost:3000/api/users
	router.post('/users', function(req, res){

		var user = new User();
		user.username = req.body.username;
		user.userpswd = req.body.userpswd;
		user.useremail = req.body.useremail;

		if (req.body.username == null || req.body.username == ''
			|| req.body.userpswd == null || req.body.userpswd == ''
			|| req.body.useremail == null || req.body.useremail == '') {
			res.json({ success: false, message: 'Ensure username, userpswd and useremail were provided.' });
		} else {
			user.save(function(err){
				if (err) {
					// res.send('We have an error: ' + err.errmsg);
					res.json({ success: false, message: 'Username or Email already exist! Try again.' });
				} else {
					res.json({ success: true, message: 'User created!' });
				}
			});
		}
	});

	// USER LOGIN ROUTE
	// http://localhost:3000/api/authenticate
	router.post('/authenticate', function(req, res){
		User.findOne({ username: req.body.username })
			.select('username userpswd useremail')
			.exec(function(err, user){
				if (err) throw err;

				if (!user) {
					res.json({ success: false, message: 'Could not authenticate user!' });
				} else if(user) {
					if (req.body.userpswd) {
						var validPassword = user.comparePassword(req.body.userpswd);
					} else {
						res.json({ success: false, message: 'No password provided!' });
					}
					if (!validPassword) {
						res.json({ success: false, message: 'Could not authenticate password!' });
					} else {
						var token = jwt.sign({ username: user.username, useremail: user.useremail }, secret, { expiresIn: '24h' });
						res.json({ success: true, message: 'Welcome!', token: token });
					}
				}
			});
	});

	// TO TAKE A TOKEN AND VERIFY HIM
	router.use(function(req, res, next){
		var token = req.body.token || req.body.query || req.headers['x-access-token'];

		if (token) {
			// verify token
			jwt.verify(token, secret, function(err, decoded){
				if (err) {
					res.json({ success: false, message: 'Token invalid' });
				} else {
					req.decoded = decoded;
					next();
				}
			});
		} else {
			res.json({ success: false, message: 'No token provided!' });
		}
	});

	// WHOIS ROUTE
	// http://localhost:3000/api/whois
	router.post('/whois', function(req, res){
		res.send(req.decoded);
	});

	return router;
}