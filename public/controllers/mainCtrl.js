angular.module('mainController', [])

.controller("mainCtrl", function ($http, $location, $timeout, Auth, $rootScope) {
	var app = this;


	$rootScope.$on('$routeChangeStart', function(){
		if (Auth.isLoggedIn()) {

			app.isLoggedIn = true;

			Auth.getUser().then(function(data){
				app.username = data.data.username;
			});
		} else {
			app.username = '';
			app.isLoggedIn = false;
		}
	});

	app.errorMsg = false;
	
	this.loginUser = function(loginData) {
		app.loading = true;
		app.errorMsg = false;

		Auth.login(app.loginData).then(
			function successCallback(data) {
				app.loading = false;
				if(data.data.success){
					app.isLoggedIn = true;

					app.successMsg = data.data.message + ' And you will have be redirecting at home page';
					$timeout(function(){
						$location.path('/');
						app.loginData = '';
						app.successMsg = false;
					}, 2000);
				}else{
					app.errorMsg = data.data.message;
				}
			}, function errorCallback(data) {}
		);
	}

	this.logoutUser = function(){
		Auth.logout();
		$location.path('/');
	}
});