(function(){
/** 
  * @line angular.module("MainModule", []);
  * @desc this creates the angular module
  * @param 
  * @info
		-
  * @return null 
  //var app = angular.module("module name", [dependancy array]);
*/
var app = angular.module("MainModule");

/** 
  * @line var MainControl = function($scope, $http, $interval, $log, )
  * @desc this is the controller
  * @param $scope, $http, $interval, $log,
  * @info
		- $scope, $http, $interval, $log are all services
  * @return null 
*/

var userControl = function($scope, github, $routeParams){

	/** 
		* @name onUserComplete
		* @desc passes an object of user data to $scope.user
		* @param object "response" - $http.get "response" object
		* @return null 
	*/
	var onUserComplete = function(data) {
		$scope.user = data;
		github.getRepos($scope.user).then(onRepos, onError );
	};

	/** 
		* @name onRepo
		* @desc passes an object of user data to $scope.repos
		* @param object "response" - $http.get "response" object
		* @return null 
	*/
	var onRepos = function(data) {
		$scope.repos = data;
	};
	/** 
		* @name onError
		* @desc provides an error message 
		* @param object "reason" - $http.get "reason" object
		* @return null
	*/
	var onError = function(reason){
		$scope.error = "Data could not be found, status: " + reason.status;
		// $scope.error = reason;
	};

	$scope.username = $routeParams.username;
	$scope.repoSortOrder = "-stargazers_count";
	github.getUser($scope.username).then(onUserComplete, onError);

};


/**
  * @line app.controller("MainController", ["$scope","$http",MainControl]);
  * @desc register the controllers to the module 
  * @param string $msg - the message to be displayed
  * @return null 
  * @info
		- ng-controller is in the HTML which connects to MainController
		- MainControl is the controller with the $scope parameter in the script
		- Passing the array into the second controller argument allows you to pass in the $scope and $http service to MainControl as parameters even if the code is minified 
		// app.controller("ng-controller", MainControl);
*/
app.controller("userController", ["$scope","github","$routeParams", userControl]);

}());
