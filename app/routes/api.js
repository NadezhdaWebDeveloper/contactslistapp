var User 		= require('../models/user');
var jwt			= require('jsonwebtoken');
var secret 		= 'homersimpson';

module.exports = function(router){

	// USER REFISTRATION ROUTE
	// http://localhost:3000/api/users
	router.post('/users', function(req, res){

		var user = new User();
		user.username = req.body.username;
		user.userpswd = req.body.userpswd;
		user.useremail = req.body.useremail;

		if (req.body.username == null || req.body.username == ''
			|| req.body.userpswd == null || req.body.userpswd == ''
			|| req.body.useremail == null || req.body.useremail == '') {
			res.json({ success: false, message: 'Ensure username, userpswd and useremail were provided' });
		} else {
			user.save(function(err){
				if (err) {
					// res.send('We have an error: ' + err.errmsg);
					res.json({ success: false, message: 'Username or Email already exist!' });
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
			.select('username, userpswd and useremail')
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
						var token = jwt.sign({ username: user.username, email: user.useremail }, secret, { expiresIn: '24h' });
						res.json({ success: true, message: 'Welcome!', token: token });
					}
				}
			});
	});


	router.use(function(req, res, next){
		var token = req.body.token || req.body.query || req.headers['x-access-token'];

		if (token) {
			// verify token
			jwt.verify(token, secret, function(err, decoded){
				if (err) {
					res.json({ success: false, message: 'Token invalid' });
				} else {
					// res.json({ success: true, message: 'Have done' });
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