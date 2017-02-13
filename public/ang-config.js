
angular.module('spaApp', 
	[
		'appRoutes',
		'regUserController',
		'userServices',
		'ngAnimate',
		'mainController',
		'authServices',
		'contactController',
		'contactServices'
	])

.config(function($httpProvider){
	$httpProvider.interceptors.push('AuthInterceptors');
});