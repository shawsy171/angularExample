(function (){

	var app = angular.module("MainModule");

	var repoControl = function ($scope, $routeParams, github) {

		var onRepo = function(data) {
			$scope.repo = data;
		};

		var onError = function(reason) {
			$scope.error = reason;
		};

		var reponame = $routeParams.reponame;
		var username = $routeParams.username;

		github.getRepoDetails(username, reponame)
			  .then(onRepo, onError);
	};

	app.controller('repoController', repoControl);
}());