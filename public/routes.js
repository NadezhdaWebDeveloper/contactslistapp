var app = angular.module('appRoutes', ['ngRoute'])

.config(function($routeProvider, $locationProvider, $httpProvider){
	$routeProvider

	.when('/', {
		templateUrl: 'views/home.html'
	})

	.when('/profile', {
		templateUrl: 'views/contact_list.html',
		controller: 'AppCtrl',
		authenticated: true
	})

	.when('/list', {
		templateUrl: 'views/contact_list.html',
		controller: 'AppCtrl',
		authenticated: true
	})

	.when('/form', {
		templateUrl: 'views/form_create_edit.html',
		controller: 'AppCtrl',
		authenticated: true
	})

	.when('/auth', {
		templateUrl: 'views/auth.html',
		controller: 'mainCtrl',
		controllerAs: 'loginCtrl',
		authenticated: false
	})

	.when('/registration', {
		templateUrl: 'views/registration.html',
		controller: 'regCtrl',
		controllerAs: 'register',
		authenticated: false
	})

	.otherwise({ redirectTo: '/' });

	// Delete hash from URL
		// $locationProvider.html5Mode({
		// 	enabled: true,
		// 	requireBase: false
		// });

	$locationProvider.hashPrefix('');

});

app.run(['$rootScope', 'Auth', '$location', function($rootScope, Auth, $location){

	$rootScope.$on('$routeChangeStart', function(event, next, current){
		if (next.$$route.authenticated == true){
			
			if (!Auth.isLoggedIn()) {
				event.preventDefault();
				$location.path('/');
			}

		} else if (next.$$route.authenticated == false){
			
			if (Auth.isLoggedIn()) {
				event.preventDefault();
				$location.path('/profile');
			}
		}
	});

}]);