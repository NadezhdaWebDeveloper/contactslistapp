
angular.module('spaApp', 
	[
		'appRoutes',
		'regUserController',
		'userServices',
		'ngAnimate',
		'mainController',
		'authServices',
		'myApp'
	])

.config(function($httpProvider){
	$httpProvider.interceptors.push('AuthInterceptors');
});