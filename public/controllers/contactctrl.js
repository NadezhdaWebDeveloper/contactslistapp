angular.module('contactController', [])

.controller('contactCtrl', function($scope, Contact, $timeout){

	var marker = false;

	$scope.errMsg = '';
	$scope.showUpdate = false;
	$scope.showGetAll = true;

	$scope.createContact = function () {

		if ($scope.contact == undefined 
			|| $scope.contact.name == null || $scope.contact.name == ''
			|| $scope.contact.email == null || $scope.contact.email == ''
			|| $scope.contact.number == null || $scope.contact.number == '')
		{
			$scope.errMsg = 'Ensure contact\'s name, contact\'s email and contact\'s number were provided.' ;
			
			$timeout(function(){
				$scope.errMsg = '';
			}, 3000);
		}else{
			Contact
				.createContact($scope.contact)
				.then(function successCallback(response) {

					if (response.success){
						$scope.contactlist.push(response.data);
						
						$timeout(function(){
							$scope.contact = {};
						}, 1000);
					}else{
						$scope.errMsg = response.message;
						$timeout(function(){
							$scope.errMsg = '';
						}, 3000);
					}


				}, function errorCallback(response) {
					console.log('errorCallback');
				});
		}
	}

	var getContacts = function(){

		Contact
			.readContact()
			.then(function successCallback(data) {

				$scope.contactlist = data;
				if (marker) {
					$scope.newlistdb = data;
				}
			}, function errorCallback(data) {
				console.log('errorCallback');
			});
	}

	getContacts();

	$scope.getAll = function(){
		getContacts();
		marker = true;
		$scope.showGetAll = false;
	};

	$scope.updateContact = function () {

		Contact
			.updateContact($scope.contact._id, $scope.contact)
			.then(function successCallback(data) {

				$scope.showUpdate = false;
				$scope.contact = {};
				getContacts();
				
			}, function errorCallback(data) {
				console.log('errorCallback');
			});
	}

	$scope.deleteContact = function (id) {
		
		Contact
			.deleteContact(id)
			.then(function successCallback(data) {
				
				$scope.showUpdate = false;
				getContacts();
				
			}, function errorCallback(data) {
				console.log('errorCallback');
			});
	}

	$scope.editContact = function (id) {
		Contact
			.editContact(id)
			.then(function successCallback(data) {
				
				$scope.showUpdate = true;
				$scope.contact = data;
				
			}, function errorCallback(data) {
				console.log('errorCallback');
			});
	}
});