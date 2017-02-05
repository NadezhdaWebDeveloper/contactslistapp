var myApp = angular.module('myApp', ['ngRoute'])
	.config(function($routeProvider){
		$routeProvider.when('/list',
		{
			templateUrl: 'views/contact_list.html',
			controller: 'AppCtrl'
		});
		$routeProvider.when('/form',
		{
			templateUrl: 'views/form_create_edit.html',
			controller: 'AppCtrl'
		});
	});

myApp.config(['$locationProvider', function($locationProvider) {
	$locationProvider.hashPrefix('');
}]);

myApp.controller("AppCtrl", function ($scope, $http) {
	
	// console.log("Hello from Controller!");

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
			console.log(response);

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
			console.log(response);
			
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
			console.log(response);

			$scope.contact = response.data;

		}, function errorCallback(response) {
			// called asynchronously if an error occurs
			// or server returns response with an error status.
		});
	}

	$scope.updateContact = function(){
		console.log($scope.contact._id);

		$http.put('/contactlist/' + $scope.contact._id, $scope.contact).then(function successCallback(response) {
			// this callback will be called asynchronously
			// when the response is available
			console.log(response);

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