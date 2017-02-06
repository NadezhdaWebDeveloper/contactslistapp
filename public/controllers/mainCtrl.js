angular.module('mainController', [])

.controller("mainCtrl", function ($http, $location, $timeout, Auth, $rootScope) {
	var app = this;

	$rootScope.$on('$routeChangeStart', function(){
		if (Auth.isLoggedIn()) {
			// console.log('User is logged in!');
			app.isLoggedIn = true;

			Auth.getUser().then(function(data){
				app.username = data.data.username;
			});
		} else {
			app.username = '';
			app.isLoggedIn = false;
			// console.log('User is not logged in!');
		}
		console.log(app.isLoggedIn);
	});

	this.loginUser = function(loginData) {
		app.errorMsg = false;
		app.loading = true;

		Auth.login(app.loginData).then(function successCallback(data) {
			if(data.data.success){
				app.isLoggedIn = true;

				app.successMsg = data.data.message + ' And you will have be redirecting at home page';
				$timeout(function(){
					$location.path('/list');
					app.loginData = '';
					app.successMsg = false;
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