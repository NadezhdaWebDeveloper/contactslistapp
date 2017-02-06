angular.module('appRoutes', ['ngRoute'])

.config(function($routeProvider, $locationProvider, $httpProvider){
	$routeProvider

	.when('/', {
		templateUrl: 'views/home.html'
	})

	.when('/list', {
		templateUrl: 'views/contact_list.html',
		controller: 'AppCtrl'
	})

	.when('/form', {
		templateUrl: 'views/form_create_edit.html',
		controller: 'AppCtrl'
	})

	.when('/auth', {
		templateUrl: 'views/auth.html',
		controller: 'mainCtrl',
		controllerAs: 'loginCtrl'
	})

	.when('/registration', {
		templateUrl: 'views/registration.html',
		controller: 'regCtrl',
		controllerAs: 'register'
	})

	.otherwise({ redirectTo: '/' });

	// Delete hash from URL
		// $locationProvider.html5Mode({
		// 	enabled: true,
		// 	requireBase: false
		// });

	$locationProvider.hashPrefix('');

});