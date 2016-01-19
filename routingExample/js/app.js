(function(){

	var app = angular.module("MainModule", ["ngRoute"]);

	app.config(function($routeProvider){
		$routeProvider
			.when("/main", {
				templateUrl: "main.html",
				controller: "MainController"
			})
			.when("/user/:username", {
				templateUrl: "user.html",
				controller: "userController"
			})
			.when("/repo/:username/:reponame", {
				templateUrl: "repo.html",
				controller: "repoController"
			})
			.otherwise({redirectTo: "/main"});
	});

}());
