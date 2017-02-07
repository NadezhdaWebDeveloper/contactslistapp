angular.module('regUserController', [])

.controller("regCtrl", function ($http, $location, $timeout, User, Auth) {
	var app = this;

	this.regUser = function(regData) {
		app.errorMsg = false;
		app.loading = true;

		User.create(app.regData).then(function successCallback(data) {
			app.loading = false;
			if(data.data.success){
				app.errorMsg = false;
				app.successMsg = data.data.message + ' And you will have be redirecting';
				$timeout(function(){
					$location.path('/auth');
				}, 2000);
			}else{
				app.errorMsg = data.data.message;
			}
		}, function errorCallback(data) {
			console.log('errorCallback');
			console.log(data.data.success);
		});
	}
});
