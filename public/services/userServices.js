angular.module('userServices', [])

.factory('User', function($http){
	var userFactory = {};

	// User.create(regData)
	userFactory.create = function(regData){
		return $http(
		{
			method: 'POST',
			url: '/api/users',
			data: regData
		});
	}

	return userFactory;
});
