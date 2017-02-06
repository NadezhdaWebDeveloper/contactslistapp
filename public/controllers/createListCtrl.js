angular.module('createListController', [])

.controller("createCtrl", function ($scope, $http) {
	var app = this;

	var refresh = function(){
		$http({
			method: 'GET',
			url: '/newlistdb'
		}).then(function successCallback(response) {
				// this callback will be called asynchronously
				// when the response is available

				$scope.newlistdb = response.data;

			}, function errorCallback(response) {
				// called asynchronously if an error occurs
				// or server returns response with an error status.
			});
	};

	refresh();

	$scope.addContact = function(){
		console.log($scope.contact);

		$http.post('/newlistdb', $scope.contact).then(function successCallback(response) {
			// this callback will be called asynchronously
			// when the response is available

			$scope.contact = null;

			refresh();

			// $scope.newlistdb = response.data;

		}, function errorCallback(response) {
			// called asynchronously if an error occurs
			// or server returns response with an error status.
		});;
	};

	$scope.removeContact = function(id){
		console.log(id);

		$http.delete('/newlistdb/' + id).then(function successCallback(response) {
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

		$http.get('/newlistdb/' + id).then(function successCallback(response) {
			// this callback will be called asynchronously
			// when the response is available

			$scope.contact = response.data;

		}, function errorCallback(response) {
			// called asynchronously if an error occurs
			// or server returns response with an error status.
		});
	}

	$scope.updateContact = function(){

		$http.put('/newlistdb/' + $scope.contact._id, $scope.contact).then(function successCallback(response) {
			// this callback will be called asynchronously
			// when the response is available

			refresh();

			$scope.contact = null;

		}, function errorCallback(response) {
			// called asynchronously if an error occurs
			// or server returns response with an error status.
		});
	}

	$scope.uploadContactslist = function(newlistdb){
		console.log($scope.newlistdb);

		$http.post('/newlistdb/', $scope.newlistdb).then(function successCallback(response) {

			
			console.log('successCallback uploadContactslist');
			console.log(response.data);

			// $scope.newlistdb = response.data;

		}, function errorCallback(response) {

			console.log('errorCallback uploadContactslist');

		});
	};
});