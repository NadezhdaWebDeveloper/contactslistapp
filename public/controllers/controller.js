
angular.module('myApp', [])

.controller("AppCtrl", function ($scope, $http, $timeout) {

	var refresh = function(){
		$http({
			method: 'GET',
			url: '/contactlist'
		}).then(
			function successCallback(response) {
				$scope.contactlist = response.data;

			}, function errorCallback(response) {}
		);
	};
	refresh();

	
	var reRefresh = function(){
		$http({
			method: 'GET',
			url: '/contactlist'
		}).then(
			function successCallback(response) {
				$scope.newlistdb = response.data;

			}, function errorCallback(response) {}
		);
	};

	var marker = false;
	
	$scope.getAll = function(){
		reRefresh();
		marker = true;
	};

	refresh();

	$scope.errMsg = false;

	$scope.addContact = function(){

		if($scope.contact != undefined && $scope.contact.name !== undefined){
			$http.post('/contactlist', $scope.contact).then(
				function successCallback(response) {
					$scope.contact = null;
					refresh();
					if (marker) { reRefresh() }

				}, function errorCallback(response) {}
			);
		}else{
			$scope.errMsg = 'Name is required field! Please enter name.';
			$timeout(function(){
				$scope.errMsg = false;
			}, 4000);
		}
	};

	$scope.removeContact = function(id){

		$http.delete('/contactlist/' + id).then(
			function successCallback(response) {
				refresh();

			}, function errorCallback(response) {}
		);
	};

	$scope.editContact = function(id){

		$http.get('/contactlist/' + id).then(
			function successCallback(response) {
				$scope.contact = response.data;

			}, function errorCallback(response) {}
		);
	}

	$scope.updateThisContact = function(id){

		$http.put('/contactlist/' + $scope.contact._id, $scope.contact).then(
			function successCallback(response) {
				reRefresh();
				$scope.contact = null;

			}, function errorCallback(response) {}
		);
	}

	$scope.updateContact = function(){

		if($scope.contact != undefined && $scope.contact != null){
			$http.put('/contactlist/' + $scope.contact._id, $scope.contact).then(
				function successCallback(response) {
					refresh();
					$scope.contact = null;

				}, function errorCallback(response) {}
			);
		}
	}
});