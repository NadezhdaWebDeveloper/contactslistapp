
angular.module('spaApp', 
	[
		'appRoutes',
		'regUserController',
		'userServices',
		'ngAnimate',
		'mainController',
		'authServices',
		'myApp',
		'createListController'
	])

.config(function($httpProvider){
	$httpProvider.interceptors.push('AuthInterceptors');
});