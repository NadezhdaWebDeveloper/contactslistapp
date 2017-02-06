angular.module('mainController', [])

.controller("mainCtrl", function ($http, $location, $timeout, Auth) {
	var app = this;
	var isLoggedIn = false;

	if (Auth.isLoggedIn()) {
		console.log('Success! User is logged in!');
		isLoggedIn = true;

		Auth.getUser().then(function(data){
			console.log(data);
		});
	} else {
		console.log('User is not logged in!');
	}

	this.loginUser = function(loginData) {
		app.errorMsg = false;
		app.loading = true;

		Auth.login(app.loginData).then(function successCallback(data) {
			app.loading = false;
			if(data.data.success){
				isLoggedIn = true;
				console.log(isLoggedIn);

				app.successMsg = data.data.message + ' And you will have be redirecting at home page';
				$timeout(function(){
					$location.path('/list');
				}, 2000);
			}else{
				app.errorMsg = data.data.message;
			}
		}, function errorCallback(data) {
			console.log('errorCallback');
			console.log(data.data.success);
		});
	}

	this.logoutUser = function(){
		console.log('User logout');
		Auth.logout();
		$location.path('/');
	}
});