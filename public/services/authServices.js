angular.module('authServices', []) 

.factory('Auth', function($http, AuthToken, $q){
	var authFactory = {};

	// Auth.login(loginData)
	authFactory.login = function(loginData){
		return $http(
		{
			method: 'POST',
			url: '/api/authenticate',
			data: loginData
		}).then(function(data){
			AuthToken.setToken(data.data.token);

			return data;

		});
	}

	// Auth.isLoggedIn();
	authFactory.isLoggedIn = function(){
		if( AuthToken.getToken() ){
			return true;
		} else {
			return false;
		}
	}

	// Auth.getUser();
	authFactory.getUser = function(){
		if( AuthToken.getToken() ){
			// return 'HAS TOKEN! Hello from authFactory.getUser';
			return $http.post('api/whois');
		} else {
			return 'NO TOKEN! Hello from authFactory.getUser';
			// return $q.reject({ message: 'User has no token' });
		}
	}

	// Auth.logout();
	authFactory.logout = function(){
		AuthToken.setToken();
	}

	return authFactory;
})

.factory('AuthToken', function($window){
	var authTokenFactory = {};

	// AuthToken.setToken(token)
	authTokenFactory.setToken = function(token){
		if (token) {
			$window.localStorage.setItem('token', token);
		} else {
			$window.localStorage.removeItem('token');
		}
	}

	// AuthToken.getToken()
	authTokenFactory.getToken = function(){
		return $window.localStorage.getItem('token');
	}

	return authTokenFactory;
})

.factory('AuthInterceptors', function(AuthToken){
	var authInterceptorsFactory = {};

	authInterceptorsFactory.request = function(config){
		var token = AuthToken.getToken();

		if (token) {
			сonfig.headers['x-access-token'] = token;
		}
	}

	return authInterceptorsFactory;
});

