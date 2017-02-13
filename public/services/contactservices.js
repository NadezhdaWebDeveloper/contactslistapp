angular.module('contactServices', []) 

.factory('Contact', function($http){
	var contactFactory = {};

	contactFactory.createContact = function(contactData){

		return $http(
		{
			method: 'POST',
			url: '/api/contact',
			data: contactData
		}).then(function(result){
			return result.data;
		});
	}

	contactFactory.readContact = function () {

		return $http(
		{
			method: 'GET',
			url: '/api/contacts'
		}).then(function(result){
			return result.data;
		});
	}

	contactFactory.updateContact = function (id, contactData) {
		
		return $http(
		{
			method: 'PUT',
			url: '/api/contact/' + id,
			data: contactData
		}).then(function(data){
			return data.data.data;
		});
	}

	// contactFactory.updateThisContact = function (id, contactData) {
	// 	return $http(
	// 	{
	// 		method: 'PUT',
	// 		url: '/api/contact/' + id,
	// 		data: contactData
	// 	}).then(function(data){
	// 		return data.data.data;
	// 	});
	// }

	contactFactory.deleteContact = function (id) {
		return $http(
		{
			method: 'DELETE',
			url: '/api/contact/' + id
		}).then(function(data){
			return data;
		});
	}


	contactFactory.editContact = function (id) {
		return $http(
		{
			method: 'GET',
			url: '/api/contact/' + id
		}).then(function(data){
			return data.data.data;
		});
	}

	return contactFactory;
});