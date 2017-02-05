var myApp = angular.module('myApp', ['ngRoute', 'userServices', 'ngAnimate', 'authServices'])
	.config(function($routeProvider, $locationProvider, $httpProvider){
		$routeProvider
		.when('/list',
		{
			templateUrl: 'views/contact_list.html',
			controller: 'AppCtrl'
		})
		.when('/form',
		{
			templateUrl: 'views/form_create_edit.html',
			controller: 'AppCtrl'
		})
		.when('/auth',
		{
			templateUrl: 'views/auth.html',
			controller: 'mainCtrl',
			controllerAs: 'loginCtrl'
		})
		.when('/registration',
		{
			templateUrl: 'views/registration.html',
			controller: 'regCtrl',
			controllerAs: 'register'
		})
		.otherwise({ redirectTo: '/' });

		// $httpProvider.interceptors.push('AuthInterceptors');

		// Delete hash from URL
			// $locationProvider.html5Mode({
			// 	enabled: true,
			// 	requireBase: false
			// });

	});

myApp.config(['$locationProvider', function($locationProvider) {
	$locationProvider.hashPrefix('');
}]);


myApp.controller("regCtrl", function ($http, $location, $timeout, User, Auth) {
	var app = this;

	if (Auth.isLoggedIn()) {
		console.log('Success! User is logged in!');
		// Auth.getUser().then(function(data){
		// 	console.log(data);
		// });
	} else {
		console.log('Error! User is not logged in!');
	}

	this.regUser = function(regData) {
		app.errorMsg = false;
		app.loading = true;

		User.create(app.regData).then(function successCallback(data) {
			app.loading = false;
			if(data.data.success){
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


myApp.controller("mainCtrl", function ($http, $location, $timeout, Auth) {
	var app = this;
	var isLoggedIn = Auth.isLoggedIn();

	if (Auth.isLoggedIn()) {
		console.log('Success! User is logged in!');
		// Auth.getUser().then(function(data){
		// 	console.log(data);
		// });
	} else {
		console.log('Error! User is not logged in!');
	}

	this.loginUser = function(loginData) {
		app.errorMsg = false;
		app.loading = true;

		Auth.login(app.loginData).then(function successCallback(data) {
			app.loading = false;
			if(data.data.success){
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




myApp.controller("AppCtrl", function ($scope, $http, Auth) {
	
	if (Auth.isLoggedIn()) {
		console.log('Success! User is logged in!');
		// Auth.getUser().then(function(data){
		// 	console.log(data);
		// });
	} else {
		console.log('Error! User is not logged in!');
	}

	var refresh = function(){
		$http({
			method: 'GET',
			url: '/contactlist'
		}).then(function successCallback(response) {
				// this callback will be called asynchronously
				// when the response is available

				$scope.contactlist = response.data;

			}, function errorCallback(response) {
				// called asynchronously if an error occurs
				// or server returns response with an error status.
			});
	};

	refresh();

	$scope.addContact = function(){
		console.log($scope.contact);

		$http.post('/contactlist', $scope.contact).then(function successCallback(response) {
			// this callback will be called asynchronously
			// when the response is available

			$scope.contact = null;

			refresh();

			// $scope.contactlist = response.data;

		}, function errorCallback(response) {
			// called asynchronously if an error occurs
			// or server returns response with an error status.
		});;
	};

	$scope.removeContact = function(id){
		console.log(id);

		$http.delete('/contactlist/' + id).then(function successCallback(response) {
			// this callback will be called asynchronously
			// when the response is available
			
			refresh();

		}, function errorCallback(response) {
			// called asynchronously if an error occurs
			// or server returns response with an error status.
		});;
	};

	$scope.editContact = function(id){
		console.log(id);

		$http.get('/contactlist/' + id).then(function successCallback(response) {
			// this callback will be called asynchronously
			// when the response is available

			$scope.contact = response.data;

		}, function errorCallback(response) {
			// called asynchronously if an error occurs
			// or server returns response with an error status.
		});
	}

	$scope.updateContact = function(){

		$http.put('/contactlist/' + $scope.contact._id, $scope.contact).then(function successCallback(response) {
			// this callback will be called asynchronously
			// when the response is available

			refresh();

			$scope.contact = null;

		}, function errorCallback(response) {
			// called asynchronously if an error occurs
			// or server returns response with an error status.
		});
	}

	// $scope.clear = function(){
	// 	$scope.contact = null;
	// }

});